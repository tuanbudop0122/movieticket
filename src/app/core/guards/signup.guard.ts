import { AuthenticationComponent } from './../../home/authentication/authentication.component';
import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SignupGuard implements CanDeactivate<AuthenticationComponent> {
  canDeactivate(component) {
    if (
      !component.canDeactivate &&
      !localStorage.getItem('user') &&
      !localStorage.getItem('DKuser')
    ) {
      if (confirm('Bạn có muốn rời khỏi trang nay không')) {
        return true;
      } else {
        return false;
      }
    }
    return true;
  }
}
