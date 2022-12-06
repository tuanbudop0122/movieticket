import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  currentUser: any = null;
  constructor(private auth: AuthenticationService, private router: Router) {}
  goToPhim() {
    this.router.navigate(['/']);

    window.scrollTo({
      top: 730,
      left: 0,
      behavior: 'smooth',
    });
  }
  goToCumRap() {
    this.router.navigate(['/']);
    window.scrollTo({
      top: 1500,
      left: 0,
      behavior: 'smooth',
    });
  }
  ngOnInit(): void {
    this.auth.currentUser.subscribe({
      next: (res: any) => {
        if (res !== null) {
          this.currentUser = res.content;
        }
      },
    });
  }

  logOut() {
    localStorage.removeItem('user');
    this.currentUser = '';
    this.router.navigate(['/']);
  }
  goToHome() {
    this.router.navigate(['/']);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
  goToFooter() {
    this.router.navigate(['/']);
    window.scrollTo({
      top: document.body.scrollHeight,
      left: 0,

      behavior: 'smooth',
    });
  }
  goToCumRap_resp() {
    this.router.navigate(['/']);
    window.scrollTo({
      top: 1200,
      left: 0,
      behavior: 'smooth',
    });
  }
  goToPhim_resp() {
    this.router.navigate(['/']);

    window.scrollTo({
      top: 560,
      left: 0,
      behavior: 'smooth',
    });
  }
}
