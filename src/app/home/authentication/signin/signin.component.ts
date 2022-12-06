import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;

  constructor(private auth: AuthenticationService, private router: Router) {
    this.signinForm = new FormGroup({
      taiKhoan: new FormControl('', [Validators.required]),
      matKhau: new FormControl('', [Validators.required]),
    });
  }
  Message = {
    taiKhoan: [{ type: 'required', message: 'Vui lòng nhập tài khoản' }],

    matKhau: [{ type: 'required', message: 'Vui lòng nhập mật khẩu' }],
  };
  ngOnInit(): void {}
  xuLyDangNhap() {
    this.signinForm.markAllAsTouched();
    if (this.signinForm.invalid) return;

    this.auth.dangNhap(this.signinForm.value).subscribe({
      next: (result: any) => {
        localStorage.setItem('user', JSON.stringify(result));
        if (result.maLoaiNguoiDung === 'KhachHang') {
          Swal.fire({
            text: 'Đăng nhập thành công',
            icon: 'success',
            confirmButtonColor: '#a5dc86',
            confirmButtonText: 'OK',
          }).then(() => this.router.navigate(['/']));
        }
        if (result.maLoaiNguoiDung === 'QuanTri') {
          Swal.fire({
            text: 'Đăng nhập thành công',
            icon: 'success',
            confirmButtonColor: '#a5dc86',
            confirmButtonText: 'OK',
          }).then(() => this.router.navigate(['/']));
        }
      },
      error: (err) => {
        Swal.fire({
          text: err.error,
          icon: 'warning',
          confirmButtonColor: '#facea8',
          confirmButtonText: 'OK',
        });
      },
    });
  }
}
