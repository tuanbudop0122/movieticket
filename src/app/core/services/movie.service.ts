import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { Movie } from '../models/movie';
import { tap, catchError } from 'rxjs/operators';
let headers = new HttpHeaders({
  'Content-Type': 'application/json',
});
@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private moviesSubject = new BehaviorSubject({
    data: [],
    loading: false,
    error: '',
  });

  constructor(private http: HttpClient) {}
  getBanner(): Observable<any> {
    const url =
      'https://movieapi.cyberlearn.vn/api/QuanLyPhim/LayDanhSachBanner';

    return this.http.get<any>(url);
  }
  getMovieList(): Observable<Movie[]> {
    const url =
      'https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP09';

    return this.http.get<Movie[]>(url);
  }
  getMovieDetail(id): Observable<any> {
    const url = `https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayThongTinPhim`;
    let params = new HttpParams();
    params = params.append('maPhim', id.toString());

    return this.http.get<any>(url, { params });
  }
  getMovieListPaging(currentPage: number, pageSize: number) {
    const url =
      'https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhimPhanTrang?maNhom=GP09';
    let params = new HttpParams();
    params = params
      .append('soTrang', currentPage.toString())
      .append('soPhanTuTrenTrang', pageSize.toString());
    return this.http.get(url, { params });
  }
  addMovie(values: any): Observable<any> {
    const url =
      'https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/ThemPhimUploadHinh';
    const formData = new FormData();
    for (let key in values) {
      formData.append(key, values[key]);
    }

    return this.http.post(url, formData);
  }
  layDanhSachPhongVe(maLichChieu): Observable<any> {
    const url = `https://movie0706.cybersoft.edu.vn/api/QuanLyDatVe/LayDanhSachPhongVe`;
    let params = new HttpParams();
    params = params.append('MaLichChieu', maLichChieu.toString());
    return this.http.get<any>(url, { params });
  }
  layHeThongRap(): Observable<any> {
    const url = `https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinHeThongRap`;
    return this.http.get<any>(url);
  }
  layThongTinLichChieuHeThongRap(maHeThongRap): Observable<any> {
    const url = `https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${maHeThongRap}&maNhom=GP09
    `;
    return this.http.get<any>(url);
  }
  layThongTinLichChieuPhim(maPhim): Observable<any> {
    const url = `https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`;
    return this.http.get<any>(url);
  }
  datVe(data): Observable<any> {
    const url = `https://movie0706.cybersoft.edu.vn/api/QuanLyDatVe/DatVe`;
    return this.http.post<any>(url, data, { responseType: 'text' as 'json' });
  }
  layDanhSachNguoiDung(): Observable<any> {
    const url =
      'https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP09';
    return this.http.get<any>(url);
  }
  xoaNguoiDung(taiKhoan): Observable<any> {
    const url = `https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`;
    return this.http.delete<any>(url, { responseType: 'text' as 'json' });
  }
  xoaPhim(maPhim): Observable<any> {
    const url = `https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/XoaPhim`;
    let params = new HttpParams();
    params = params.append('maPhim', maPhim.toString());
    return this.http.delete<any>(url, {
      params,
      responseType: 'text' as 'json',
    });
  }
  capNhatThongTinNguoiDung(item): Observable<any> {
    const url = `https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`;
    return this.http.put<any>(url, item);
  }
  themNguoiDung(item): Observable<any> {
    const url = `https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/ThemNguoiDung`;
    return this.http.post<any>(url, item);
  }
  thongTinTaiKhoan(item): Observable<any> {
    const url = `https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/ThongTinTaiKhoan`;
    return this.http.post<any>(url, item);
  }
  capNhatPhim(item): Observable<any> {
    const url = `https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/CapNhatPhim`;
    return this.http.post<any>(url, item);
  }
  themPhim(item): Observable<any> {
    const url = `https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/ThemPhim`;
    return this.http.post<any>(url, item);
  }
}
