import { Component, Input, OnInit } from '@angular/core';
import { SharingDataDatgheService } from 'src/app/core/services/sharing-data-datghe.service';

@Component({
  selector: 'app-ghe-item',
  templateUrl: './ghe-item.component.html',
  styleUrls: ['./ghe-item.component.scss'],
})
export class GheItemComponent implements OnInit {
  @Input() ghe;
  trangThaiGhe: boolean = false;
  constructor(private sharingDataDatGheService: SharingDataDatgheService) {}
  selectSeat() {
    if (!this.ghe.daDat) {
      this.trangThaiGhe = !this.trangThaiGhe;
      this.sharingDataDatGheService.SharingDataItemGhe(this.ghe);
    }
  }
  ngOnInit(): void {
  }
}
