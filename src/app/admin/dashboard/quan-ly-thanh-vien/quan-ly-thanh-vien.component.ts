import { MovieService } from './../../../core/services/movie.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-quan-ly-thanh-vien',
  templateUrl: './quan-ly-thanh-vien.component.html',
  styleUrls: ['./quan-ly-thanh-vien.component.scss'],
})
export class QuanLyThanhVienComponent implements OnInit {
  mangNguoiDung = [];
  keyword: string = '';
  @Output() eventEditUser = new EventEmitter();
  @Output() eventInfoUser = new EventEmitter();
  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.getListUser();
  }
  getListUser() {
    this.movieService.layDanhSachNguoiDung().subscribe({
      next: (res) => (this.mangNguoiDung = res),
    });
  }
  suaNguoiDung(user) {
    this.eventEditUser.emit(user);
  }
  themNguoiDung() {
    this.eventEditUser.emit(null);
  }
  xoaNguoiDung(taiKhoan) {
    this.movieService.xoaNguoiDung(taiKhoan).subscribe(
      (data) => {
        Swal.fire({
          text: 'Xóa tài khoản thành công',
          icon: 'success',
          confirmButtonColor: '#a5dc86',
          confirmButtonText: 'OK',
        }).then(() => {
          this.handleSearch();
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
  handleSearch() {
    this.movieService.layDanhSachNguoiDung().subscribe((data) => {
      this.mangNguoiDung = data;
      if (this.keyword) {
        this.mangNguoiDung = this.mangNguoiDung.filter((item) => {
          if (item.hoTen !== null) {
            return (
              item.hoTen.toLowerCase().indexOf(this.keyword.toLowerCase()) !==
              -1
            );
          }
        });
      }
    });
  }
  getInfoUser(taiKhoan) {
    this.eventInfoUser.emit(taiKhoan);
  }
}
