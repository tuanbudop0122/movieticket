import { Component, Input, OnInit } from '@angular/core';
import { TrailerService } from 'src/app/core/services/trailer.service';

@Component({
  selector: 'app-itemphim',
  templateUrl: './itemphim.component.html',
  styleUrls: ['./itemphim.component.scss'],
})
export class ItemphimComponent implements OnInit {
  @Input() ItemPhim;
  constructor(private trailer: TrailerService) {}
  beginTrailer(dataPhim) {
    this.trailer.SharingDataTrailer(dataPhim);
  }
  ngOnInit(): void {}
}
