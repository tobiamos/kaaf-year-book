import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StudentService } from '../services/student.service';
import { AuthGuard } from '../guards/auth.guard';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  public toastConfig = {
    closeButton: true,
    progressBar: true
  };
  previousUrl;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _student: StudentService,
    private authguard: AuthGuard
  ) {
    this.createForm();
  }

  ngOnInit() {
    if (this.authguard.redirectUrl) {
      this.toastr.error(
        'You must be logged in to view that page',
        '',
        this.toastConfig
      );
      this.previousUrl = this.authguard.redirectUrl;
      this.authguard.redirectUrl = undefined;
    }
  }

  createForm() {
    this.loginForm = this.fb.group({
      indexNumber: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    // console.log(this.loginForm.value);
    const student = this.loginForm.value;
    this._student.loginStudent(student).subscribe(
      data => {
        this.toastr.success('Login Success', '', this.toastConfig);
        this._student.storeUserData(data.token);
        setTimeout(() => {
          if (this.previousUrl) {
            this.router.navigate([this.previousUrl]);
          } else {
            this.router.navigate(['/profile']);
          }
        }, 2000);
      },
      error => {
        this.toastr.error(`${error}`, '', this.toastConfig);
      }
    );
  }
}
