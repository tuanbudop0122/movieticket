import { MovieService } from 'src/app/core/services/movie.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  constructor(private movieService: MovieService) {}
  mangHeThongRap = [];

  ngOnInit(): void {
    this.movieService.layHeThongRap().subscribe({
      next: (res) => {
        this.mangHeThongRap = res;
      },
    });
  }
}
