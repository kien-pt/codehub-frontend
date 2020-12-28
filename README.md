# CODEHUB - WEBSITE GIẢI BÀI TẬP LẬP TRÌNH
__Bài tập lớn môn Phát triển ứng dụng Web__

Frontend: https://github.com/kien-pt/codehub-frontend

Backend : https://github.com/giangbang/web-project

<table>
  <thead>
    <tr>
      <th>STT</th>
      <th>Group</th>
      <th>Feature/Usecase</th>
      <th>Actor</th>
      <th>Page</th>
      <th>Notes</th>
      <th>Test</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td align="center">1</td>
      <td rowspan=6>Quản lý tài khoản</td>
      <td>Đăng ký</td>
      <td rowspan=5>Tất cả người dùng</td>
      <td>Trang Register</td>
      <td />
      <td align="center">:white_check_mark:</td>
    </tr>
    <tr>
      <td align="center">2</td>
      <td>Đăng nhập</td>
      <td>Trang Login</td>
      <td />
      <td align="center">:white_check_mark:</td>
    </tr>
    <tr>
      <td align="center">3</td>
      <td>Đăng xuất</td>
      <td>App header</td>
      <td />
      <td align="center">:white_check_mark:</td>
    </tr>
    <tr>
      <td align="center">4</td>
      <td>Đổi mật khẩu</td>
      <td>App header</td>
      <td />
      <td align="center">:white_check_mark:</td>
    </tr>
    <tr>
      <td align="center">5</td>
      <td>Thay đổi thông tin cá nhân</td>
      <td>Trang cá nhân</td>
      <td />
      <td align="center">:white_check_mark:</td>
    </tr>
    <tr>
      <td align="center">6</td>
      <td>Xoá tài khoản</td>
      <td>Admin</td>
      <td>Trang Manager</td>
      <td />
      <td align="center">:white_check_mark:</td>
    </tr>
    <tr>
      <td align="center">7</td>
      <td rowspan=4>Quản lý khoá học</td>
      <td>Xem nội dung khoá học</td>
      <td>Tất cả người dùng</td>
      <td>Trang chủ / Trang khoá học</td>
      <td />
      <td align="center">:white_check_mark:</td>
    </tr>
    <tr>
      <td align="center">8</td>
      <td>Thêm khoá học</td>
      <td rowspan=3>Admin</td>
      <td rowspan=3>Trang chủ</td>
      <td />
      <td align="center">:white_check_mark:</td>
    </tr>
    <tr>
      <td align="center">9</td>
      <td>Sửa khoá học</td>
      <td />
      <td align="center">:white_check_mark:</td>
    </tr>
    <tr>
      <td align="center">10</td>
      <td>Xoá khoá học</td>
      <td />
      <td align="center">:white_check_mark:</td>
    </tr>
    <tr>
      <td align="center">11</td>
      <td rowspan=4>Quản lý danh mục bài tập</td>
      <td>Xem nội dung danh mục bài tập</td>
      <td>Tất cả người dùng</td>
      <td rowspan=4>Trang khoá học</td>
      <td rowspan=4>Mỗi danh mục<br/>bài tập sẽ<br/>gắn với một<br/>và chỉ một<br/>khoá học</td>
      <td align="center">:white_check_mark:</td>
    </tr>
    <tr>
      <td align="center">12</td>
      <td>Thêm danh mục bài tập</td>
      <td rowspan=3>Admin</td>
      <td align="center">:white_check_mark:</td>
    </tr>
    <tr>
      <td align="center">13</td>
      <td>Sửa danh mục bài tập</td>
      <td align="center">:white_check_mark:</td>
    </tr>
    <tr>
      <td align="center">14</td>
      <td>Xoá danh mục bài tập</td>
      <td align="center">:white_check_mark:</td>
    </tr>
    <tr>
      <td align="center">15</td>
      <td rowspan=4>Quản lý bài tập</td>
      <td>Xem nội dung bài tập</td>
      <td>Tất cả người dùng</td>
      <td>Trang khoá học</td>
      <td rowspan=4>Mỗi bài tập<br/>sẽ gắn với<br/>một và chỉ<br/>một danh mục<br/>bài tập</td>
      <td align="center">:white_check_mark:</td>
    </tr>
    <tr>
      <td align="center">16</td>
      <td>Thêm bài tập</td>
      <td rowspan=3>Admin</td>
      <td>Trang thêm bài tập</td>
      <td align="center">:white_check_mark:</td>
    </tr>
    <tr>
      <td align="center">17</td>
      <td>Sửa bài tập</td>
      <td>Trang sửa bài tập</td>
      <td align="center">:white_check_mark:</td>
    </tr>
    <tr>
      <td align="center">18</td>
      <td>Xoá bài tập</td>
      <td>Trang khoá học</td>
      <td align="center">:white_check_mark:</td>
    </tr>
    <tr>
      <td align="center">19</td>
      <td rowspan=2>Quản lý bài nộp</td>
      <td>Xem nội dung bài nộp</td>
      <td rowspan=2>Tất cả người dùng</td>
      <td>Trang bài nộp</td>
      <td />
      <td align="center">:white_check_mark:</td>
    </tr>
    <tr>
      <td align="center">20</td>
      <td>Thêm bài nộp</td>
      <td>Trang bài tập</td>
      <td>Chính là<br/>việc người<br/>dùng submit<br/>code lên hệ<br/>thống</td>
      <td align="center">:white_check_mark:</td>
    </tr>
    <tr>
      <td align="center">21</td>
      <td rowspan=3>Quản lý bình luận</td>
      <td>Xem nội dung bình luận</td>
      <td rowspan=2>Tất cả người dùng</td>
      <td rowspan=3>Trang bài tập</td>
      <td rowspan=3>Mỗi bình luận<br/>sẽ gắn với<br/>một và chỉ<br/>một bài tập</td>
      <td align="center">:white_check_mark:</td>
    </tr>
    <tr>
      <td align="center">22</td>
      <td>Thêm bình luận</td>
      <td align="center">:white_check_mark:</td>
    </tr>
    <tr>
      <td align="center">23</td>
      <td>Xoá bình luận</td>
      <td>Admin</td>
      <td align="center">:white_check_mark:</td>
    </tr>
  </tbody>
</table>
