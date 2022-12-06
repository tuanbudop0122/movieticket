import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  constructor(private router: Router, private auth: AuthenticationService) {}
  @ViewChild('formSignin', { static: false }) formSignin: NgForm;
  currentUser: any = null;
  ngOnInit(): void {
    this.auth.currentUser.subscribe({
      next: (res: any) => {
        this.currentUser = res;
        if (this.currentUser.maLoaiNguoiDung === 'QuanTri') {
          this.router.navigate(['admin/dashboard']);
        }
      },
    });
  }
}
