import { DatveComponent } from './datve/datve.component';
import { PipeModule } from './../core/pipe/pipe.module';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeLayoutComponent } from './home-layout/home-layout.component';
import { TrangchuComponent } from './trangchu/trangchu.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CarouselComponent } from './carousel/carousel.component';
import { PhimComponent } from './phim/phim.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { SigninComponent } from './authentication/signin/signin.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { RouterModule, Routes } from '@angular/router';
import { PhimdangchieuComponent } from './phim/phimdangchieu/phimdangchieu.component';
import { ItemphimComponent } from './phim/itemphim/itemphim.component';
import { ToolblockComponent } from './components/toolblock/toolblock.component';
import { HethongrapComponent } from './components/hethongrap/hethongrap.component';
import { RapitemComponent } from './components/hethongrap/rapitem/rapitem.component';
import { LichChieuTheoPhimComponent } from './components/hethongrap/rapitem/lich-chieu-theo-phim/lich-chieu-theo-phim.component';
import { LichChieuComponent } from './components/hethongrap/rapitem/lich-chieu/lich-chieu.component';
import { DanhsachgheComponent } from './danhsachghe/danhsachghe.component';
import { GheItemComponent } from './ghe-item/ghe-item.component';
import { MaterialModule } from 'src/app/core/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'src/app/modal/modal.module';
import { CountdownModule } from 'ngx-countdown';
import { SignupGuard } from '../core/guards/signup.guard';
import { BillComponent } from './bill/bill.component';
import { ChiTietPhimComponent } from './chi-tiet-phim/chi-tiet-phim.component';

const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    children: [
      {
        path: '',
        component: TrangchuComponent,
      },
      { path: 'chitiet/:id', component: ChiTietPhimComponent },
      { path: 'datve/:maLichChieu', component: DatveComponent },
      {
        path: 'signin',
        component: AuthenticationComponent,
        canDeactivate: [SignupGuard],
      },
    
    ],
  },
];
@NgModule({
  declarations: [
    HomeLayoutComponent,
    TrangchuComponent,
    HeaderComponent,
    FooterComponent,
    CarouselComponent,
    PhimComponent,
    AuthenticationComponent,
    SigninComponent,
    SignupComponent,
    PhimdangchieuComponent,
    ItemphimComponent,
    ToolblockComponent,
    HethongrapComponent,
    RapitemComponent,
    LichChieuTheoPhimComponent,
    LichChieuComponent,
    DatveComponent,
    DanhsachgheComponent,
    GheItemComponent,
    BillComponent,
    ChiTietPhimComponent,
  ],
  imports: [
    CommonModule,
    ModalModule,
    RouterModule.forChild(routes),

    PipeModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    CountdownModule,
  ],
})
export class HomeModule {}
