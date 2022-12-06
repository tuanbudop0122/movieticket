import { DSG } from './../../core/models/movie';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import Swal from 'sweetalert2';
import { GheItemComponent } from '../ghe-item/ghe-item.component';

@Component({
  selector: 'app-danhsachghe',
  templateUrl: './danhsachghe.component.html',
  styleUrls: ['./danhsachghe.component.scss'],
})
export class DanhsachgheComponent implements OnInit, OnChanges {
  @Input() DanhSachGhe;
  @Input() maGheHuy;
  @Input() dataLichChieu;
  @ViewChildren(GheItemComponent) ItemGhe: QueryList<GheItemComponent>;
  constructor() {}
  ngOnChanges() {
    if (this.ItemGhe) {
      this.ItemGhe.map((itemGhe) => {
        if (itemGhe.ghe.maGhe === this.maGheHuy) itemGhe.trangThaiGhe = false;
      });
    }
  }
  ngOnInit() {
  }
  handleEvent(event) {
    if (event.action === 'done') {
      Swal.fire({
        text:
          'Đã hết thời gian giữ ghế. Vui lòng thực hiện đơn hàng trong thời hạn 5 phút. ',
        icon: 'warning',
        confirmButtonColor: '#facea8',
        confirmButtonText: 'Đặt vé lại',
      }).then(() => {
        location.reload();
      });
    }
  }
}
