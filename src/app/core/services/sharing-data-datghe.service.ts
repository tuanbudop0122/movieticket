import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharingDataDatgheService {
  private ItemGhe = new BehaviorSubject({} as Object);
  SharingItemGhe = this.ItemGhe.asObservable();
  constructor() {}

  SharingDataItemGhe(ghe) {
    this.ItemGhe.next(ghe);
  }
}
