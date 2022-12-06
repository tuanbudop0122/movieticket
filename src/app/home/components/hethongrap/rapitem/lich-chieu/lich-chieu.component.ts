import { Component, Input, OnInit } from '@angular/core';
import { MovieService } from 'src/app/core/services/movie.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-lich-chieu',
  templateUrl: './lich-chieu.component.html',
  styleUrls: ['./lich-chieu.component.scss'],
})
export class LichChieuComponent implements OnInit {
  @Input() cumRap;
  @Input() chiso;
  @Input() chiso1;
  mangDanhSachPhimTheoCumRap: any;
  thongTinLichChieu = [];
  mangNgay = [];
  mangDanhSachPhim: any = [];
  a = [];
  constructor(private movieService: MovieService, private router: Router) {}

  ngOnInit(): void {
    this.movieService.getMovieList().subscribe((res) => {
      this.mangDanhSachPhim = res;
      this.listMaPhim();
    });
    this.mangDanhSachPhimTheoCumRap = this.cumRap.danhSachPhim;
  }
  listMaPhim() {
    this.mangDanhSachPhimTheoCumRap.map((item) => {
      let index = this.thongTinLichChieu.findIndex((phim) => {
        return phim.maPhim === item.maPhim;
      });
      if (index === -1) {
        this.mangDanhSachPhim.map((i, index) => {
          if (item.maPhim === i.maPhim) {
            let obj = {
              hinhAnh: this.mangDanhSachPhim[index].hinhAnh,
              danhGia: this.mangDanhSachPhim[index].danhGia,
              ngayKhoiChieu: this.mangDanhSachPhim[index].ngayKhoiChieu,
              maPhim: item.maPhim,
              tenPhim: item.tenPhim,
              mangNgayChieuGioChieu: this.listNgayChieu(item.maPhim),
            };
            this.thongTinLichChieu.push(obj);
          }
        });
      }
    });
  }
  listNgayChieu(maPhim) {
    let mangNgayChieuGioChieu = [];
    this.mangDanhSachPhimTheoCumRap.map((item) => {
      this.a = item.lstLichChieuTheoPhim;

      if (item.maPhim === maPhim) {
        this.a.map((z) => {
          let index = mangNgayChieuGioChieu.findIndex((ncgc) => {
            return ncgc === item.lstLichChieuTheoPhim;
          });
          if (index === -1) {
            mangNgayChieuGioChieu.push(z.ngayChieuGioChieu);
            mangNgayChieuGioChieu.map((i, ind) => {
              let date = i.slice(0, 10);
              let index = this.mangNgay.findIndex((ngay) => {
                return ngay === date;
              });
              if (index === -1) this.mangNgay.push(date);
            });
          }
        });
      }
    });

    return mangNgayChieuGioChieu;
  }

  goToBuyTicket(ncgc, maRap) {
    if (!localStorage.getItem('user')) {
      Swal.fire({
        text: 'Bạn chưa đăng nhập',
        icon: 'warning',
        confirmButtonColor: '#facea8',
        confirmButtonText: 'OK',
      });
    } else {
      this.thongTinLichChieu.map((item) => {
        item.mangNgayChieuGioChieu.map((nc) => {
          if (nc === ncgc && maRap === item.maRap) {
            this.movieService.layThongTinLichChieuPhim(item.maPhim).subscribe({
              next: (res) => {
                res.heThongRapChieu.map((heThongRapChieu) => {
                  heThongRapChieu.cumRapChieu.map((cumRap) => {
                    if (cumRap.maCumRap === this.cumRap.maCumRap) {
                      cumRap.lichChieuPhim.map((lichChieu) => {
                        if (lichChieu.ngayChieuGioChieu === ncgc) {
                          this.router.navigate([
                            '/datve/',
                            lichChieu.maLichChieu,
                          ]);
                        }
                      });
                    }
                  });
                });
              },
            });
          }
        });
      });
    }
  }
}
