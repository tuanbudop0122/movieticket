import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const userInfo = localStorage.getItem('user');
    if (userInfo) {
      const { maLoaiNguoiDung } = JSON.parse(userInfo);
      if (maLoaiNguoiDung === 'QuanTri') {
        return true;
      }

      this.router.navigate(['/']);
      return false;
    }

    this.router.navigate(['/signin']);
    return false;
  }
}
