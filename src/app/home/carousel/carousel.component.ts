import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/core/services/movie.service';
declare var $: any;
@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit {
  img: any;
  constructor(private banner: MovieService) {}

  ngOnInit(): void {
    $('.pgwSlider').pgwSlider({
      transitionEffect: 'sliding',
      displayControls: true,
      autoSlide: true,
    });
  }
}
