import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from 'src/app/core/services/movie.service';
import { SharingDataDatgheService } from 'src/app/core/services/sharing-data-datghe.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss'],
})
export class BillComponent implements OnInit {
  @Input() dataLichChieu;
  @Input() maLichChieu;
  @Output() eventHuyGhe = new EventEmitter();
  danhSachGheDangChon = [];
  tongTien: number = 0;
  constructor(
    private movieService: MovieService,
    private sharingDataDatGheService: SharingDataDatgheService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.handleGhe();
  }
  ngOnDestroy() {
    this.sharingDataDatGheService.SharingDataItemGhe('');
  }
  totalMoney() {
    this.tongTien = 0;
    this.danhSachGheDangChon.map((item, index) => {
      this.tongTien += item.giaVe;
    });
  }
  findIndex(maGhe) {
    let index = this.danhSachGheDangChon.findIndex((item) => {
      return item.maGhe === maGhe;
    });
    return index;
  }
  handleGhe() {
    this.sharingDataDatGheService.SharingItemGhe.subscribe((ghe: any) => {
      let index = this.findIndex(ghe.maGhe);
      if (index === -1) {
        if (Object.entries(ghe).length) this.danhSachGheDangChon.push(ghe);
      } else {
        this.danhSachGheDangChon.splice(index, 1);
      }
      this.totalMoney();
    });
  }
  huyGhe(maGhe) {
    this.danhSachGheDangChon.splice(this.findIndex(maGhe), 1);
    this.totalMoney();
    this.eventHuyGhe.emit(maGhe);
  }

  buyTicket() {
    let data = JSON.parse(localStorage.getItem('user'));
    if (data != null) {
      if (!this.danhSachGheDangChon.length) {
        Swal.fire({
          text: 'Vui Lòng Chọn Ghế',
          icon: 'warning',
          confirmButtonColor: '#facea8',
          confirmButtonText: 'OK',
        });
      } else {
        let dataDatVe = {
          maLichChieu: Number(this.maLichChieu),
          danhSachVe: [],
          taiKhoanNguoiDung: data.taiKhoan,
        };

        this.danhSachGheDangChon.map((item) => {
          let veVM = {
            maGhe: item.maGhe,
            giaVe: item.giaVe,
          };

          dataDatVe.danhSachVe.push(veVM);
        });
        this.movieService.datVe(dataDatVe).subscribe(
          (res) => {
            Swal.fire({
              text: 'Đặt ghế thành công!',
              icon: 'success',
              confirmButtonColor: '#a5dc86',
              confirmButtonText: 'OK',
            }).then(() => {
              this.router.navigate(['/']);
            });
          },
          (err) => {
            console.log(err);
          }
        );
      }
    } else {
      Swal.fire({
        text: 'Bạn chưa đăng nhập',
        icon: 'warning',
        confirmButtonColor: '#facea8',
        confirmButtonText: 'OK',
      });
    }
  }
}
