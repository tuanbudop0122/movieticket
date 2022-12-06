import { MovieService } from './../../../core/services/movie.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-toolblock',
  templateUrl: './toolblock.component.html',
  styleUrls: ['./toolblock.component.scss'],
})
export class ToolblockComponent implements OnInit {
  constructor(private movieService: MovieService, private router: Router) {}
  danhSachPhim = [];
  layThongTinPhim = [];
  mangLichChieuPhim = [];
  statusLichChieu: boolean = false;
  maPhim: any;
  select = [
    { label: 'Phim', value: '', option: [] },
    { label: 'Rạp', value: '', option: [], err: 'vui lòng chọn phim' },
    { label: 'Ngày chiếu', value: '', option: [], err: 'vui lòng chọn rạp' },
    {
      label: 'Suất chiếu',
      value: '',
      option: [],
      err: 'vui lòng chọn suất chiếu',
    },
  ];
  ngOnInit(): void {
    this.layDanhSachPhim();
  }
  layDanhSachPhim = async () => {
    this.movieService.getMovieList().subscribe({
      next: (res) => {
        this.danhSachPhim = res;

        this.danhSachPhim = Object.values(this.danhSachPhim);
        this.select[0].option = this.danhSachPhim;
      },
    });
  };
  _LayThongTinPhim(maPhim) {
    if (maPhim) {
      this.movieService
        .layThongTinLichChieuPhim(maPhim)
        .subscribe((data: any) => {
          this._LayTenRap(data.heThongRapChieu);
          this._LayNgayChieu(data.heThongRapChieu, this.select[1].value);
          this._LaySuatChieu(
            data.heThongRapChieu,
            this.select[1].value,
            this.select[2].value
          );
        });
    }
  }

  _LayTenRap(lichChieu) {
    let mangRap = [];
    let mangLichChieuPhim = [];
    lichChieu.map((i) => {
      i.cumRapChieu.map((j) => {
        mangLichChieuPhim.push(j.lichChieuPhim);
        let index = mangRap.findIndex((rap) => {
          return rap === j.tenCumRap;
        });
        if (index === -1) mangRap.push(j.tenCumRap);
        return mangLichChieuPhim;
      });
    });

    mangLichChieuPhim.map((i) => {
      i.map((j) => {
        return this.mangLichChieuPhim.push(j.maLichChieu);
      });
    });
    this.select[1].option = mangRap;
  }

  _LayNgayChieu = async (lichChieu, rap) => {
    let mangNgayChieu = [];
    let mangLichChieuPhim = [];
    lichChieu.map((i) => {
      i.cumRapChieu.map((j) => {
        mangLichChieuPhim.push(j.lichChieuPhim);
        return mangLichChieuPhim;
      });
    });

    mangLichChieuPhim.map((i) => {
      i.map((j) => {
        this.mangLichChieuPhim.map((k) => {
          if (j.maLichChieu === k) {
            let date = j.ngayChieuGioChieu.slice(0, 10);
            let index = mangNgayChieu.findIndex((ngayChieu) => {
              return ngayChieu === date;
            });
            if (index === -1) mangNgayChieu.push(date);
          }
        });
      });
    });
    this.select[2].option = mangNgayChieu;
  };

  _LaySuatChieu(lichChieu, rap, ngayChieu) {
    let mangSuatChieu = [];
    let mangLichChieuPhim = [];

    lichChieu.map((i) => {
      i.cumRapChieu.map((j) => {
        return mangLichChieuPhim.push(j.lichChieuPhim);
      });
      mangLichChieuPhim.map((i) => {
        i.map((j) => {
          this.mangLichChieuPhim.map((k) => {
            let date = j.ngayChieuGioChieu.slice(0, 10);
            if (j.maLichChieu === k && date === ngayChieu) {
              let time = j.ngayChieuGioChieu.slice(11, 16);
              mangSuatChieu.push(time);
            }
          });
        });
      });

      // let date = lichChieu.ngayChieuGioChieu.slice(0, 10);
    });
    this.select[3].option = mangSuatChieu;
  }

  getInfo() {
    if (this.maPhim != this.select[0].value) {
      this.maPhim = this.select[0].value;
      this.select[3].value = '';
    }

    this._LayThongTinPhim(this.select[0].value);
    if (this.select[3].value) this.statusLichChieu = true;
    else this.statusLichChieu = false;
  }
  datVe() {
    if (!this.statusLichChieu) {
      Swal.fire({
        text: 'Vui lòng chọn đầy đủ thông tin',
        icon: 'warning',
        confirmButtonColor: '#facea8',
        confirmButtonText: 'OK',
      });
    } else {
      if (!localStorage.getItem('user')) {
        Swal.fire({
          text: 'Bạn chưa đăng nhập',
          icon: 'warning',
          confirmButtonColor: '#facea8',
          confirmButtonText: 'OK',
        });
      } else {
        let mangLichChieu = [];
        let ngayChieuGioChieu =
          this.select[2].value + 'T' + this.select[3].value;
        this.movieService
          .layThongTinLichChieuPhim(this.select[0].value)
          .subscribe((data: any) => {
            data.heThongRapChieu.map((i) => {
              i.cumRapChieu.map((j) => {
                return mangLichChieu.push(j.lichChieuPhim);
              });
            });
            let mangNgayChieuGioChieu = [];
            mangLichChieu.map((i) => {
              i.map((j) => {
                let date = j.ngayChieuGioChieu.slice(0, 16);
                this.mangLichChieuPhim.map((k) => {
                  if (k === j.maLichChieu && date === ngayChieuGioChieu) {
                    this.router.navigate(['/datve/', j.maLichChieu]);
                  }
                });

                return mangNgayChieuGioChieu.push(j.ngayChieuGioChieu);
              });
            });
          });
      }
    }
  }
}
