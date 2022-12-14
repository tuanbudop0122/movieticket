import { MovieService } from 'src/app/core/services/movie.service';
import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/core/models/movie';

declare var $: any;
@Component({
  selector: 'app-phimdangchieu',
  templateUrl: './phimdangchieu.component.html',
  styleUrls: ['./phimdangchieu.component.scss'],
})
export class PhimdangchieuComponent implements OnInit {
  constructor(private movieService: MovieService) {}
  movieList: Movie[] | null = null;
  movieListLength: any;
  dangChieu = [];
  sapChieu = [];
  ngOnInit(): void {
    this.getMovieList();
  }

  beginFlipsterSlider() {
    $(document).ready(function () {
      $('.my-flipster').flipster({
        style: 'carousel',
        spacing: -0.5,
        nav: true,
        buttons: true,
        scrollwheel: false,
        loop: false,
      });
    });
    this.buttonFlipsterSlider();
  }
  buttonFlipsterSlider() {
    $(document).ready(function () {
      var next = $('.flipster__button--next');
      var content_next = `<svg width="18px"  stroke-width="1"height="17px" viewBox="-1 0 18 17" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <g>
    <polygon class="arrow"  stroke-width="1"points="16.3746667 8.33860465 7.76133333 15.3067621 6.904 14.3175671 14.2906667 8.34246869 6.908 2.42790698 7.76 1.43613596"></polygon>
    <polygon class="arrow-fixed" stroke-width="1" points="16.3746667 8.33860465 7.76133333 15.3067621 6.904 14.3175671 14.2906667 8.34246869 6.908 2.42790698 7.76 1.43613596"></polygon>
    <path stroke-width="1" d="M-4.58892184e-16,0.56157424 L-4.58892184e-16,16.1929159 L9.708,8.33860465 L-1.64313008e-15,0.56157424 L-4.58892184e-16,0.56157424 Z M1.33333333,3.30246869 L7.62533333,8.34246869 L1.33333333,13.4327013 L1.33333333,3.30246869 L1.33333333,3.30246869 Z"></path>
    </g></svg>`;

      for (var i = 0; i < next.length; i++) {
        next[i].innerHTML = content_next;
      }
      var prev = $('.flipster__button--prev');
      var content_prev = `<svg width="18px"height="17px" viewBox="0 0 18 17" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <g id="prev" transform="translate(8.500000, 8.500000) scale(-1, 1) translate(-8.500000, -8.500000)">
    <polygon class="arrow"  stroke-width="1"points="16.3746667 8.33860465 7.76133333 15.3067621 6.904 14.3175671 14.2906667 8.34246869 6.908 2.42790698 7.76 1.43613596"></polygon>
    <polygon class="arrow-fixed"  stroke-width="1"points="16.3746667 8.33860465 7.76133333 15.3067621 6.904 14.3175671 14.2906667 8.34246869 6.908 2.42790698 7.76 1.43613596"></polygon>
    <path  stroke-width="1"d="M-1.48029737e-15,0.56157424 L-1.48029737e-15,16.1929159 L9.708,8.33860465 L-2.66453526e-15,0.56157424 L-1.48029737e-15,0.56157424 Z M1.33333333,3.30246869 L7.62533333,8.34246869 L1.33333333,13.4327013 L1.33333333,3.30246869 L1.33333333,3.30246869 Z"></path>
      </g>
      </svg>`;
      for (var i = 0; i < prev.length; i++) {
        prev[i].innerHTML = content_prev;
      }
    });
  }
  getMovieList() {
    this.movieService.getMovieList().subscribe((data: any) => {
      this.movieList = data;
      this.beginFlipsterSlider();
      this.dangChieu = this.movieList.slice(0, 16);
      this.sapChieu = this.movieList.slice(17);
    });
  }
}
