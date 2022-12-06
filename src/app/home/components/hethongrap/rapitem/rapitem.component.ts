import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/core/services/movie.service';

@Component({
  selector: 'app-rapitem',
  templateUrl: './rapitem.component.html',
  styleUrls: ['./rapitem.component.scss'],
})
export class RapitemComponent implements OnInit {
  @Input() itemMaHTRap;
  @Input() chiso;
  listLichChieu: any = [];
  listLichChieu1: any = [];
  maPhim: any;
  constructor(
    private movieService: MovieService,
    private activatedRoute: ActivatedRoute
  ) {}
  getParamFromURL() {
    this.maPhim = this.activatedRoute.snapshot.paramMap.get('id');
  }

  handleActive(listCumRap, cumRap) {
    let dem = 0;
    for (let index in listCumRap) {
      if (listCumRap[index].danhSachPhim[0].maPhim == this.maPhim) {
        if (listCumRap[index].maCumRap == cumRap.maCumRap) {
          return index;
        }
      } else dem++;
    }
    if (dem == listCumRap.length) return 0;
  }
  ngOnInit(): void {
    this.getParamFromURL();
    this.movieService
      .layThongTinLichChieuHeThongRap(this.itemMaHTRap)
      .subscribe({
        next: (res) => {
          this.listLichChieu1 = res;
          this.listLichChieu1.map((i) => {
            this.listLichChieu = i.lstCumRap;
          });
        },
      });
  }
}
