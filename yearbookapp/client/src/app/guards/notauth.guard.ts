import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StudentService } from '../services/student.service';

@Injectable()
export class NotauthGuard implements CanActivate {
  constructor(private auth: StudentService, private router: Router) {}
  canActivate() {
    if (this.auth.loggedIn()) {
      this.router.navigate(['/']);
      return false;
    } else {
      return true;
    }
  }
}
