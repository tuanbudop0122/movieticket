import { DSG } from './../../core/models/movie';
import { MovieService } from './../../core/services/movie.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-datve',
  templateUrl: './datve.component.html',
  styleUrls: ['./datve.component.scss'],
})
export class DatveComponent implements OnInit {
  public MaLichChieu: string;
  public DanhSachGhe: DSG[] | null = null;
  public maGheHuy: any;
  public dataLichChieu: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private movieService: MovieService
  ) {}

  viTriHuy(ghe) {
    this.maGheHuy = ghe;
  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((kq) => {
      this.MaLichChieu = kq.maLichChieu;
      this.movieService
        .layDanhSachPhongVe(this.MaLichChieu)
        .subscribe((res) => {
          this.DanhSachGhe = res;
          this.dataLichChieu = res;
        });
    });
  }
}
