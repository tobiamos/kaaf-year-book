import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private fb: FormBuilder, private router: Router) {
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
    console.log(this.loginForm.value);
    setTimeout(() => {
      this.router.navigate(['/profile']);
    }, 2000);
  }
}
