import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/core/services/movie.service';

@Component({
  selector: 'app-hethongrap',
  templateUrl: './hethongrap.component.html',
  styleUrls: ['./hethongrap.component.scss'],
})
export class HethongrapComponent implements OnInit {
  constructor(
    private movieService: MovieService,
    private activatedRoute: ActivatedRoute
  ) {}
  maPhim: any;
  heThongRap: any = [];
  getParamFromURL() {
    this.maPhim = this.activatedRoute.snapshot.paramMap.get('id');
  }
  ngOnInit(): void {
    this.getParamFromURL();
    this.movieService.layHeThongRap().subscribe({
      next: (res) => {
        this.heThongRap = res;
      },
    });
  }
}
