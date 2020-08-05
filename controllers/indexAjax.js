// Khai báo svService tương tác api
var svService = new SinhVienService();

// Giao tiếp với api thông qua axios
var getApiSinhVien = function () {
    var objectAPI = {
        url: 'http://svcy.myclass.vn/api/SinhVien/LayDanhSachSinhVien', //Đường dẫn đi đến file hoặc link backend cung cấp 
        method: 'GET' //Phương thức backend cung cấp
    }

    // Gửi yêu cầu dữ liệu đến backend => backend trả về promise
    var promise = axios(objectAPI);

    // Xử lí thành công 
    var funcSuccess = function (result) {
        console.log(result.data);
        // Gọi ajax thành công thì render table
        renderTableSinhVien(result.data)
    }
    // Xử lí thất bại 
    var funcFail = function (error) {
        console.log(error);
    }
    // then():Hàm nhận vào giấ trị là 1 hàm xử lí thành công 
    // catch(): Hàm nhận vào giá trị là 1 hàm xử lý thất bại
    promise.then(funcSuccess).catch(funcFail);
    // Lưu ý : ajax là 1 kỹ thuật xử lý bất đồng bộ.
}
getApiSinhVien();
var renderTableSinhVien = function (mangSinhVien) {
    var contentTable = '';
    // Sau khi lấy được data từ backend => tạo bảng giao diện
    for (var i = 0; i < mangSinhVien.length; i++) {
        // Lấy ra từng sinh viên trong dữ liệu backend trả về
        var sinhVien = mangSinhVien[i];
        // Tạo ra 1 sv object từ prototype sinh viên 
        var sv = new SinhVien();
        sv.maSV = sinhVien.MaSV;
        sv.tenSV = sinhVien.HoTen;
        sv.email = sinhVien.Email;
        sv.diemToan = sinhVien.DiemToan;
        sv.diemLy = sinhVien.DiemLy;
        sv.diemHoa = sinhVien.DiemHoa;
        sv.diemRenLuyen = 5;
        contentTable += `
                 <tr>
                     <td>${sv.maSV}</td>
                     <td>${sv.tenSV}</td>
                     <td>${sv.email}</td>
                     <td>${sv.xepLoai()}</td>
                     <td>${sv.tinhDiemTrungBinh()}</td>
                     <td>${sv.diemRenLuyen}</td>
                     <td>
                     <button class="btn btn-primary" onclick="chinhSuaSinhVien('${sv.maSV}')">Chỉnh Sửa</button>
                     <button class="btn btn-danger" onclick="xoaSinhVien('${sv.maSV}')">Xóa</button>
                     </td>
                 </tr>
        `
        // Dom đến giao diện ghi thoòn tin dữ liệu vào 
        document.getElementById('tableSinhVien').innerHTML = contentTable;
    }
}

// -----CHỈNH SỬÁ SINH VIÊN------
var chinhSuaSinhVien = function(maSV){
    var promise = svService.layThongTinSinhVien(maSV);
    promise.then(function(result){
        console.log(result.data)
        var sinhVienEdit = result.data;
        document.getElementById('maSinhVien').value = sinhVienEdit.MaSV;
        document.getElementById('tenSinhVien').value = sinhVienEdit.HoTen;
        document.getElementById('diemToan').value = sinhVienEdit.DiemToan;
        document.getElementById('diemLy').value = sinhVienEdit.DiemLy;
        document.getElementById('diemHoa').value = sinhVienEdit.DiemHoa;
        document.getElementById('email').value = sinhVienEdit.Email;
        document.getElementById('maSinhVien').disabled = true;
        document.getElementById('btnThemSinhVien').disabled = true;
    }).catch(function(error){
        console.log(error);
    })
}

// ------LƯU THÔNG TIN SINH VIÊN ----
document.getElementById('btnLuuSinhVien').onclick = function(){
    // Lấy thông tinh sinh viên gán vào data gửi lên api
    var sinhVienCapNhat = {
        "MaSV": document.getElementById('maSinhVien').value,
        "HoTen": document.getElementById('tenSinhVien').value,
        "Email": document.getElementById('email').value,
        "SoDT": "10293102",
        "CMND": "12312031",
        "DiemToan": document.getElementById('diemToan').value,
        "DiemLy": document.getElementById('diemLy').value,
        "DiemHoa": document.getElementById('diemHoa').value,
    }
    // Gọi service câp nhật dữ liệu server 
    var promise = svService.capNhatSinhVien(sinhVienCapNhat);
    promise.then(function(result){
        console.log(result.data);
        // Load lại table
        getApiSinhVien();
        // Mở khoá nút thêm sinh viên 
        document.getElementById('btnThemSinhVien').disabled = false;
        document.getElementById('maSinhVien').disabled = false;
        document.getElementById('btnLuuSinhVien').disabled = true;
    })
    console.log(sinhVienCapNhat);
}

// ----THÊM DỮ LIỆU TRÊN SERVER-----
document.getElementById('btnThemSinhVien').onclick = function () {
    // Lấy thôgn tin từ người dùng gán vào data backend yêu cầu => Data phải chuânt định dạng backend yêu cầu 
    var sinhVien = {
        MaSV: document.getElementById('maSinhVien').value,
        HoTen: document.getElementById('tenSinhVien').value,
        Email: document.getElementById('email').value,
        SoDT: 0985822877,
        CMND: 261469421,
        DiemToan: document.getElementById('diemToan').value,
        DiemLy: document.getElementById('diemLy').value,
        DiemHoa: document.getElementById('diemHoa').value
    }
    console.log(sinhVien);
    // Dùng axios gọi ajax đưa dữ liệu lên backend xử lí 
    var objectAxios = {
        url: 'http://svcy.myclass.vn/api/SinhVien/ThemSinhVien',
        method: 'POST',
        data: sinhVien //Thuộc tính backend yêu cầu dữ liệu gửi đi phải đúng định dạng
    }

    var promise = axios(objectAxios);
    promise.then(function (result) {
        // Thêm thành công gọi lại api lấy danh sáchc sinh viên mới về 
        getApiSinhVien();
        console.log(result.data);
    }).catch(function (error) {
        console.log(error);
    })
}

// ----- XOÁ SINH VUÊN QUA API 
var xoaSinhVien = function (maSV){
    // Dùng service gọi api xoá 
    var promise =svService.xoaSinhVien(maSV);
    promise.then(function(result){
        // Xoá thành công thì load lại api get LayDanhSachSinhVien
        getApiSinhVien();
        console.log(result.data)
    }).catch(function(error){
        console.log(error);
    })
}