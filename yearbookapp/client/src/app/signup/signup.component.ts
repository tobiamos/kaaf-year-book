import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  studentForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {}

  createForm() {
    this.studentForm = this.fb.group({
      name: ['', [Validators.required]],
      indexNumber: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirm: ['', [Validators.required]],
      quote: ['', []],
      facebook: ['', []],
      twitter: ['', []],
      snapchat: ['', []],
      instagram: ['', []]
    });
  }

  onSubmit() {
    console.log(this.studentForm.value);
  }

  get name() {
    return this.studentForm.get('name');
  }
  get indexNumber() {
    return this.studentForm.get('indexNumber');
  }
  get email() {
    return this.studentForm.get('email');
  }

  get password() {
    return this.studentForm.get('password');
  }
  get confirm() {
    return this.studentForm.get('confirm');
  }
  get quote() {
    return this.studentForm.get('quote');
  }
  get facebook() {
    return this.studentForm.get('facebook');
  }
  get twitter() {
    return this.studentForm.get('twitter');
  }
  get snapchat() {
    return this.studentForm.get('snapchat');
  }
  get instagram() {
    return this.studentForm.get('instagram');
  }
}
