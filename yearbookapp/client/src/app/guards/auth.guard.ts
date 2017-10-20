import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { StudentService } from '../services/student.service';

@Injectable()
export class AuthGuard implements CanActivate {
  redirectUrl;
  constructor(private auth: StudentService, private router: Router) {}
  canActivate(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.auth.loggedIn()) {
      return true;
    } else {
      this.redirectUrl = state.url;
      this.router.navigate(['/login']);
      return false;
    }
  }
}
