import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/core/services/movie.service';
import { TrailerService } from 'src/app/core/services/trailer.service';

@Component({
  selector: 'app-chi-tiet-phim',
  templateUrl: './chi-tiet-phim.component.html',
  styleUrls: ['./chi-tiet-phim.component.scss'],
})
export class ChiTietPhimComponent implements OnInit {
  public id: string;
  public MovieDetail: any;
  public lichChieu: any;
  public TrailerChiTiet: string;
  constructor(
    private activated: ActivatedRoute,
    private movieService: MovieService,
    private trailer: TrailerService,
    private sanitizer: DomSanitizer
  ) {}

  beginTrailer(dataPhim) {
    this.trailer.SharingDataTrailer(dataPhim);
  }
  ngOnInit(): void {
    this.activated.params.subscribe((res) => {
      this.id = res.id;
      this.movieService.getMovieDetail(this.id).subscribe((result) => {
        this.MovieDetail = result;
        this.TrailerChiTiet = this.MovieDetail.trailer;
        this.lichChieu = result.lichChieu;

        let kt = this.TrailerChiTiet.includes('youtu.be/');
        if (kt == true) {
          this.TrailerChiTiet = this.TrailerChiTiet.replace(
            'youtu.be/',
            'www.youtube.com/embed/'
          );
        } else {
          this.TrailerChiTiet = this.TrailerChiTiet.replace(
            'watch?v=',
            'embed/'
          );
        }
      });
    });
  }
}
