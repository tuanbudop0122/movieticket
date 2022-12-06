import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private curentUserSubject = new BehaviorSubject(null);
  currentUser = this.curentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    this.initCurrentUser();
  }
  initCurrentUser() {
    const userInfo = localStorage.getItem('user');
    if (userInfo) {
      this.curentUserSubject.next(JSON.parse(userInfo));
    }
  }
  dangKy(value: any) {
    const url = 'https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/DangKy';
    return this.http.post(url, { ...value, maNhom: 'GP10' });
  }
  dangNhap(values: any) {
    const url =
      'https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/DangNhap';
    return this.http.post(url, values).pipe(
      tap((result) => {
        this.curentUserSubject.next(result);
      })
    );
  }
}
