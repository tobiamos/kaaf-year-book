import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StudentService } from '../services/student.service';

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
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _student: StudentService
  ) {
    this.createForm();
  }

  ngOnInit() {}

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
          this.router.navigate(['/profile']);
        }, 2000);
      },
      error => {
        this.toastr.error(`${error}`, '', this.toastConfig);
      }
    );
  }
}
