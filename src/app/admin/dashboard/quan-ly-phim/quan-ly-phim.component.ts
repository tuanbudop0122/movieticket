import { Movie } from 'src/app/core/models/movie';
import { MovieService } from 'src/app/core/services/movie.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TrailerService } from 'src/app/core/services/trailer.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-quan-ly-phim',
  templateUrl: './quan-ly-phim.component.html',
  styleUrls: ['./quan-ly-phim.component.scss'],
})
export class QuanLyPhimComponent implements OnInit {
  @Output() eventEditMovie = new EventEmitter();
  @Output() eventSuaPhim = new EventEmitter();
  keyword: any;
  mangDanhSachPhim: Movie[] | null = null;

  flagEditAdd: boolean;

  constructor(
    private movieService: MovieService,
    private trailer: TrailerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getListMovie();
  }

  getListMovie() {
    this.movieService.getMovieList().subscribe({
      next: (res) => (this.mangDanhSachPhim = res),
    });
  }
  beginTrailerMovie(dataPhim) {
    this.trailer.SharingDataTrailer(dataPhim);
  }
  suaPhim(item) {
    this.flagEditAdd = false;
    this.eventEditMovie.emit(this.flagEditAdd);
    this.eventSuaPhim.emit(item);
  }
  themPhim() {
    this.flagEditAdd = true;
    this.eventEditMovie.emit(this.flagEditAdd);
  }
  xoaPhim(item) {
    this.movieService.xoaPhim(item.maPhim).subscribe(
      (data) => {
        Swal.fire({
          text: 'Thành công!',
          icon: 'success',
          confirmButtonColor: '#a5dc86',
          confirmButtonText: 'OK',
        }).then(() => {
          this.getListMovie();
        });
      },
      (err) => {
        Swal.fire({
          text: err.error,
          icon: 'warning',
          confirmButtonColor: '#facea8',
          confirmButtonText: 'OK',
        }).then(() => {});
      }
    );
  }
  handleSearch() {
    this.movieService.getMovieList().subscribe((data) => {
      this.mangDanhSachPhim = data.filter((item) => {
        return (
          item.tenPhim.toLowerCase().indexOf(this.keyword.toLowerCase()) !== -1
        );
      });
    });
  }
}
