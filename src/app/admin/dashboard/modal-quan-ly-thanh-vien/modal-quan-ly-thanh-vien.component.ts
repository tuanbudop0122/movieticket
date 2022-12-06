import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MovieService } from 'src/app/core/services/movie.service';
@Component({
  selector: 'app-modal-quan-ly-thanh-vien',
  templateUrl: './modal-quan-ly-thanh-vien.component.html',
  styleUrls: ['./modal-quan-ly-thanh-vien.component.scss'],
})
export class ModalQuanLyThanhVienComponent implements OnInit {
  @Input() userEdit;
  @Input() taiKhoan;
  @ViewChild('formQuanLyThanhVien', { static: false })
  formQuanLyThanhVien: NgForm;
  user = {
    taiKhoan: '',
    hoTen: '',
    email: '',
    soDt: '',
    matKhau: '',
    maLoaiNguoiDung: '',
  };
  infoUser;
  constructor(private movieService: MovieService) {}

  ngOnInit() {}
  ngOnChanges() {
    if (this.taiKhoan) this.getInfoUser();
    if (this.formQuanLyThanhVien) {
      if (this.userEdit) {
        this.formQuanLyThanhVien.setValue({ ...this.userEdit });
      } else {
        this.formQuanLyThanhVien.setValue({ ...this.user });
      }
    }
  }

  handleOnSubmit() {
    this.user.taiKhoan = this.formQuanLyThanhVien.value.taiKhoan;
    this.user.hoTen = this.formQuanLyThanhVien.value.hoTen;
    this.user.email = this.formQuanLyThanhVien.value.email;
    this.user.soDt = this.formQuanLyThanhVien.value.soDt;
    this.user.matKhau = this.formQuanLyThanhVien.value.matKhau;
    this.user.maLoaiNguoiDung = this.formQuanLyThanhVien.value.maLoaiNguoiDung;
    if (this.userEdit) {
      this.user.taiKhoan = this.userEdit.taiKhoan;
      this.movieService
        .capNhatThongTinNguoiDung({ ...this.user, maNhom: 'GP10' })
        .subscribe(
          () => {
            Swal.fire({
              text: 'Cập nhập người dùng thành công',
              icon: 'success',
              confirmButtonColor: '#a5dc86',
              confirmButtonText: 'OK',
            }).then(() => {
              location.reload();
            });
          },
          (err) => {
            Swal.fire({
              text: err.error,
              icon: 'warning',
              confirmButtonColor: '#facea8',
              confirmButtonText: 'OK',
            });
          }
        );
    } else {
      this.movieService
        .themNguoiDung({ ...this.user, maNhom: 'GP10' })
        .subscribe(
          () => {
            Swal.fire({
              text: 'Thêm người dùng thành công',
              icon: 'success',
              confirmButtonColor: '#a5dc86',
              confirmButtonText: 'OK',
            }).then(() => {
              location.reload();
            });
          },
          (err) => {
            Swal.fire({
              text: err.error,
              icon: 'warning',
              confirmButtonColor: '#facea8',
              confirmButtonText: 'OK',
            });
          }
        );
    }
  }
  getInfoUser() {
    this.movieService
      .thongTinTaiKhoan({ taiKhoan: this.taiKhoan })
      .subscribe((data) => {
        this.infoUser = data;
      });
  }
}
