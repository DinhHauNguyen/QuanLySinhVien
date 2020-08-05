
//mangSinhVien: Chứa thông tin tất cả sinh viên được thêm từ form
var mangSinhVien = [];
var validate = new Validation();


document.getElementById('btnThemSinhVien').onclick = function () {
    //Lấy thông tin sinh viên thêm vào đối tượng sinh viên
    var sinhVien = new SinhVien();
    sinhVien.maSV = document.getElementById('maSinhVien').value;
    sinhVien.tenSV = document.getElementById('tenSinhVien').value;
    sinhVien.email = document.getElementById('email').value;
    sinhVien.loaiSV = document.getElementById('loaiSinhVien').value;
    sinhVien.diemHoa = document.getElementById('diemHoa').value;
    sinhVien.diemLy = document.getElementById('diemLy').value;
    sinhVien.diemToan = document.getElementById('diemToan').value;
    sinhVien.diemRenLuyen = document.getElementById('diemRenLuyen').value;
    console.log(sinhVien);
 

    // Kiểm tra dữ liệu hợp lệ trước khi thêm một mảng rống đầu và cuối cỷa chuỗi
    var valid = validate.kiemTraRong(sinhVien.maSV, '#error_maSinhVien') & validate.kiemTraRong(sinhVien.tenSV, '#error_tenSinhVien') & validate.kiemTraRong(sinhVien.email, '#error_email') & validate.kiemTraRong(sinhVien.diemToan, '#error_diemToan') & validate.kiemTraRong(sinhVien.diemLy, '#error_diemLy') & validate.kiemTraRong(sinhVien.diemHoa, '#error_diemHoa') & validate.kiemTraRong(sinhVien.diemRenLuyen, '#error_diemRenLuyen');
    // trim() phương thức loại bỏ khoảng trắng đầu và cuối 
    // if(sinhVien.maSV.trim() === ''){
    //     // DOm đến thẻ thông báo dưới thẻ input#maSV
    //     document.getElementById('error_maSinhVien').style.display = 'block';
    //     document.getElementById('error_maSinhVien').innerHTML = 'Mã sinh viên không được bỏ trống';
    //     valid = false;
    // }else{
    //     // Trường hợp người dùng nhập hợp lệ (display:none, gán rỗng lỗi)
    //     document.getElementById('error_maSinhVien').style.display = 'none';
    //     document.getElementById('error_maSinhVien').innerHTML ='';
    // }
    // if(sinhVien.tenSV.trim() === ''){
    //     // DOm đến thẻ thông báo dưới thẻ input#maSV
    //     document.getElementById('error_tenSinhVien').style.display = 'block';
    //     document.getElementById('error_tenSinhVien').innerHTML = 'Tên sinh viên không được bỏ trống';
    //     valid = false;
    // }else{
    //     document.getElementById('error_tenSinhVien').style.display = 'none';
    //     document.getElementById('error_tenSinhVien').innerHTML ='';
    // }
    // if(sinhVien.email.trim() === ''){
    //     // DOm đến thẻ thông báo dưới thẻ input#maSV
    //     document.getElementById('error_email').style.display = 'block';
    //     document.getElementById('error_email').innerHTML = 'Email sinh viên không được bỏ trống';
    //     valid = false;
    // }else{
    //     document.getElementById('error_maSinhVien').style.display = 'none';
    //     document.getElementById('error_maSinhVien').innerHTML ='';
    // }
    // if(sinhVien.diemRenLuyen.trim() === ''){
    //     // DOm đến thẻ thông báo dưới thẻ input#maSV
    //     document.getElementById('error_diemRenLuyen').style.display = 'block';
    //     document.getElementById('error_diemRenLuyen').innerHTML = 'Điểm rèn luyện không được bỏ trống';
    //     valid = false;
    // }else{
    //     document.getElementById('error_maSinhVien').style.display = 'none';
    //     document.getElementById('error_maSinhVien').innerHTML ='';
    // }

    // Kiểm tra tên là kí tự 
    // var regexAllLetter = /^[a-z A-Z]+$/;
    // if (regexAllLetter.test(sinhVien.tenSV)){
    //     document.querySelector('#error_all_letter_tenSinhVien').style.display = 'none';
    //     document.querySelector('#error_all_letter_tenSinhVien').innerHTML = '';
    // }else{
    //     document.querySelector('#error_all_letter_tenSinhVien').style.display = 'block';
    //     document.querySelector('#error_all_letter_tenSinhVien').innerHTML = 'Nhập tên không hợp lệ';
    //     valid = false;
    // }
    // Kiểm tra tên hợp lệ
    valid &= validate.kiemTraTatCaLaChuoi(sinhVien.tenSV, '#error_all_letter_tenSinhVien');
    // Kiểm tra email
    valid &= validate.kiemTraEmail(sinhVien.email, '#error_all_letter_email');
    // Kiểm tra điểm toán lí hoá
    // các giá trị selector phải khác nhau nếu dùng chung một function
    valid &= validate.kiemTraDiem(sinhVien.diemToan, '#error_all_number_diemToan');
    valid &= validate.kiemTraDiem(sinhVien.diemLy, '#error_all_number_diemLy');
    valid &= validate.kiemTraDiem(sinhVien.diemHoa, '#error_all_number_diemHoa');
    // Kiểm tra giá trị
    valid &= validate.kiemTraGiaTri(sinhVien.diemToan, '#error_min_max_value_diemToan', 0, 10);
    valid &= validate.kiemTraGiaTri(sinhVien.diemLy, '#error_min_max_value_diemLy', 0, 10);
    valid &= validate.kiemTraGiaTri(sinhVien.diemHoa, '#error_min_max_value_diemHoa', 0, 10);
    // Kiểm tra độ dài của một chuỗi
    valid &= validate.kiemTraDoDai(sinhVien.maSV, '#error_min_max_value_maSV', 0, 5);

    if (!valid) {
        // Nếu như valid ===false =>khôgn hợp lệ
        return;
    }
    //push(): phương thức thêm 1 phần tử vào mangSinhVien
    mangSinhVien.push(sinhVien);
    console.log(mangSinhVien);
    renderTableSinhVien(mangSinhVien);
    luuLocalStorage();

    // console.log(mangSinhVien);

    // //Tạo nội dung thẻ tr SinhVien
    // var trSinhVien = document.createElement('tr');
    // //Tạo nội dung các thẻ td
    // var tdMaSinhVien = document.createElement('td');
    // tdMaSinhVien.innerHTML = sinhVien.maSV;

    // var tdTenSinhVien = document.createElement('td');
    // tdTenSinhVien.innerHTML = sinhVien.tenSV;

    // var tdEmail = document.createElement('td');
    // tdEmail.innerHTML = sinhVien.email;

    // var tdLoaiSV = document.createElement('td');
    // tdLoaiSV.innerHTML = sinhVien.xepLoai();

    // var tdDiemTrungBinh = document.createElement('td');
    // tdDiemTrungBinh.innerHTML = sinhVien.tinhDiemTrungBinh();

    // var tdDiemRenLuyen = document.createElement('td');
    // tdDiemRenLuyen.innerHTML = sinhVien.diemRenLuyen;

    // //Thêm 1 trường td dành cho button Xóa
    // var tdAction = document.createElement('td');

    // var btnXoa = document.createElement('button');
    // btnXoa.innerHTML = 'Xóa';
    // btnXoa.className = 'btn btn-danger';
    // btnXoa.id = 'btnXoa';
    // btnXoa.onclick = function () {
    //     //Tìm ra phần tử cha (td) => Từ td tìm ra (tr) xóa
    //     btnXoa.parentElement.parentElement.remove();
    // }
    // tdAction.appendChild(btnXoa);
    // //Đưa các thẻ td vào thẻ tr 
    // trSinhVien.appendChild(tdMaSinhVien);
    // trSinhVien.appendChild(tdTenSinhVien);
    // trSinhVien.appendChild(tdEmail);
    // trSinhVien.appendChild(tdLoaiSV);
    // trSinhVien.appendChild(tdDic emTrungBinh);
    // trSinhVien.appendChild(tdDiemRenLuyen);
    // trSinhVien.appendChild(tdAction);

    // //Dom đến thẻ tbody appendChild(tr)
    // document.getElementById('tableSinhVien').appendChild(trSinhVien);
}



// var renderTableSinhVien = function (mangSV) {
//     //Từ dữ liệu mảng tạo ra các thẻ tr tương ứng
//     var chuoiTr = '';
//     for (var index = 0; index < mangSV.length; index++) {
//         //Mỗi lần duyệt lấy ra dữ liệu của 1 sinh viên trong mảng
//         var sinhVien = mangSV[index];
//         // TẠO OBJECT MỚI LẤY DỮ LIỆU TỪ mangSV[i] gán qua
//         var sv = new SinhVien();
//         sv.maSV = sinhVien.maSV;
//         sv.tenSV = sinhVien.tenSV;
//         sv.email = sinhVien.email;
//         sv.diemHoa = sinhVien.diemHoa;
//         sv.diemLy = sinhVien.diemLy;
//         sv.diemToan = sinhVien.diemToan;
//         sv.diemRenLuyen = sinhVien.diemRenLuyen;
//         //Từ dữ liệu sinh viên tạo ra từng dòng <tr> tương ứng
//         chuoiTr += `
//                 <tr>
//                     <td>${sv.maSV}</td>
//                     <td>${sv.tenSV}</td>
//                     <td>${sv.email}</td>
//                     <td>${sv.xepLoai()}</td>
//                     <td>${sv.tinhDiemTrungBinh()}</td>
//                     <td>${sv.diemRenLuyen}</td>
//                     <td><button class="btn btn-danger" onclick="xoaSinhVien('${sinhVien.maSV}')">Xóa</button></td>
//                 </tr>
//         `
//     }
//     //Thoát ra vòng lặp
//     document.getElementById('tableSinhVien').innerHTML = chuoiTr;
// }

// var xoaSinhVien = function (maSV) {
//     //Từ mã sinh viên sẽ tìm ra thằng sinhVien cần xóa
//     for (var index = mangSinhVien.length - 1; index >= 0; index--) {
//         //Mỗi lần duyệt lấy ra 1 sinhVien
//         var sinhVien = mangSinhVien[index];
//         if (sinhVien.maSV === maSV) //Nếu sinhVien trong mảng có mã = maSinhVien được click
//         {
//             //Tại vị trí đó mình sẽ xóa phần đó đi
//             mangSinhVien.splice(index, 1);
//         }
//     }
//     //Sau khi xóa xong tạo lại tableSinhVien
//     renderTableSinhVien(mangSinhVien);
//     console.log(mangSinhVien)
// }

// var luuLocalStorage = function () {
//     // Biến mangSinhVien => chuỗi
//     var sMangSinhVien = JSON.stringify(mangSinhVien);
//     // Lưu vào localstorage
//     localStorage.setItem('mangSinhVien', sMangSinhVien);
// }

// var layDuLieuLocalStorage = function () {
//     if (localStorage.getItem('mangSinhVien')) {
//         // Lấy dữ liệu từ localstorage
//         var sMangSinhVien = localStorage.getItem('mangSinhVien');
//         // chuyển chuỗi localstorage về mảng (object) và gán cho mangSinhVien
//         mangSinhVien = JSON.parse(sMangSinhVien);
//         // Gọi hàm render mangSinhVien => render laji table
//         renderTableSinhVien(mangSinhVien);
//         // console.log(sMangSinhVien);
//     }

// }
// layDuLieuLocalStorage();
