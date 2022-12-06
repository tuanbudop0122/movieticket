import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  userEdit;
  taiKhoan;
  flag: boolean;
  itemSuaPhim: any;
  constructor() {}

  ngOnInit(): void {}
  EditMovie(event) {
    this.flag = event;
  }
  suaPhim(event) {
    this.itemSuaPhim = event;
  }
  openModalUser(user) {
    this.userEdit = user;
  }
  getInfoUser(taiKhoan) {
    this.taiKhoan = taiKhoan;
  }
}
