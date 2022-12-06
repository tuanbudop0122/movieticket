import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  public signupForm: FormGroup;
  constructor(private auth: AuthenticationService, private router: Router) {
    this.signupForm = new FormGroup({
      hoTen: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ' +
            'ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ' +
            'ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$'
        ),
      ]),
      taiKhoan: new FormControl('', [
        Validators.required,
        Validators.pattern('^[A-Za-z0-9_-]+$'),
        Validators.minLength(5),
        Validators.maxLength(16),
      ]),
      matKhau: new FormControl('', [
        Validators.required,
        Validators.pattern('^[A-Za-z0-9_-]+$'),
        Validators.minLength(5),
        Validators.maxLength(16),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@' +
            '[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'
        ),
      ]),
      soDt: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]+$'),
      ]),
    });
  }
  accountValidationMessages = {
    hoTen: [
      { type: 'required', message: 'Vui lòng nhập họ tên' },
      { type: 'pattern', message: 'Họ tên phải là chữ' },
    ],
    taiKhoan: [
      { type: 'required', message: 'Vui lòng nhập tài khoản' },
      { type: 'pattern', message: 'Tài khoản không được chứa kí tự đặc biệt' },
      { type: 'minlength', message: 'Tài khoản phải từ 5 đến 16 kí tự' },
      { type: 'maxlength', message: 'Tài khoản phải từ 5 đến 16 kí tự' },
    ],
    matKhau: [
      { type: 'required', message: 'Vui lòng nhập mật khẩu' },
      { type: 'pattern', message: 'Tài khoản không được chứa kí tự đặc biệt' },
      { type: 'minlength', message: 'Mật khẩu phải từ 5 đến 16 kí tự' },
      { type: 'maxlength', message: 'Mật khẩu phải từ 5 đến 16 kí tự' },
    ],
    email: [
      { type: 'required', message: 'Vui lòng nhập email' },
      { type: 'pattern', message: 'Email không hợp lệ' },
    ],
    soDt: [
      { type: 'required', message: 'Vui lòng nhập số điện thoại' },
      { type: 'pattern', message: 'Số điện thoại không hợp lệ' },
    ],
  };
  xuLyDangKy() {
    this.signupForm.markAllAsTouched();
    if (this.signupForm.invalid) return;
    this.auth.dangKy(this.signupForm.value).subscribe({
      next: (result) => {
        localStorage.setItem('DKuser', JSON.stringify(result));
        Swal.fire({
          text: 'Đăng ký thành công',
          icon: 'success',
          confirmButtonColor: '#a5dc86',
          confirmButtonText: 'OK',
        })
      },
      error: (err) => {
        console.log(err)
        {
          Swal.fire({
            text: err.error,
            icon: 'warning',
            confirmButtonColor: '#facea8',
            confirmButtonText: 'OK',
          });
        }
      },
      complete: () => {
      },
    });
    this.signupForm.reset()
  }

  ngOnInit(): void {}
}
