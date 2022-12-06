import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { QuanLyThanhVienComponent } from './dashboard/quan-ly-thanh-vien/quan-ly-thanh-vien.component';
import { QuanLyPhimComponent } from './dashboard/quan-ly-phim/quan-ly-phim.component';
import { ModalPhimComponent } from './dashboard/modal-phim/modal-phim.component';
import { ModalQuanLyThanhVienComponent } from './dashboard/modal-quan-ly-thanh-vien/modal-quan-ly-thanh-vien.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/core/material/material.module';
import { ModalModule } from 'src/app/modal/modal.module';
const routes: Routes = [
  { path: '', component: AdminComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
];
@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    QuanLyThanhVienComponent,
    QuanLyPhimComponent,
    ModalPhimComponent,
    ModalQuanLyThanhVienComponent,
  ],
  imports: [
    CommonModule,
    ModalModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild(routes),
  ],
})
export class AdminModule {}
