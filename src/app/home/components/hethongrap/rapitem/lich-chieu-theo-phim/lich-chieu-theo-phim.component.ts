import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from 'src/app/core/services/movie.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-lich-chieu-theo-phim',
  templateUrl: './lich-chieu-theo-phim.component.html',
  styleUrls: ['./lich-chieu-theo-phim.component.scss'],
})
export class LichChieuTheoPhimComponent implements OnInit {
  @Input() cumRap;
  @Input() maPhim;
  @Input() chiso;
  @Input() chiso1;
  mangPhim = [];
  mangNgay = [];
  constructor(private movieService: MovieService, private router: Router) {}
  goToBuyTicket(maLichChieu) {
    if (!localStorage.getItem('user')) {
      Swal.fire({
        text: 'Bạn chưa đăng nhập',
        icon: 'warning',
        confirmButtonColor: '#facea8',
        confirmButtonText: 'OK',
      });
    } else this.router.navigate(['/datve/', maLichChieu]);
  }

  ngOnInit(): void {
    this.movieService.layThongTinLichChieuPhim(this.maPhim).subscribe({
      next: (res) => {
        res.heThongRapChieu.map((heThongRapChieu) => {
          heThongRapChieu.cumRapChieu.map((cumRapChieu) => {
            if (cumRapChieu.maCumRap === this.cumRap.maCumRap) {
              this.mangPhim.push(cumRapChieu.lichChieuPhim);
              cumRapChieu.lichChieuPhim.map((lichChieu) => {
                let date = lichChieu.ngayChieuGioChieu.slice(0, 10);
                let index = this.mangNgay.findIndex((ngay) => {
                  return ngay === date;
                });
                if (index === -1) this.mangNgay.push(date);
              });
            }
          });
        });
      },
    });
  }
}
