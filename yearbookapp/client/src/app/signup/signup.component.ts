
import { Component, OnInit, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnChanges {
  studentForm: FormGroup;
  allowed;
  allowedlength;
  constructor(private fb: FormBuilder, private router: Router) {
    this.createForm();
  }

  ngOnInit() {}

  ngOnChanges() {
    // this.max();
  }

  createForm() {
    this.studentForm = this.fb.group(
      {
        name: ['', [Validators.required, Validators.maxLength(20)]],
        indexNumber: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(8),
            Validators.pattern(/^\d+$/)
          ]
        ],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(35),
            Validators.pattern(
              /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/
            )
          ]
        ],
        confirm: ['', [Validators.required]],
        department: ['', [Validators.required]],
        quote: ['', [Validators.maxLength(140)]],
        phone: [
          '',
          [
            Validators.required,
            Validators.maxLength(15),
            Validators.pattern(/^\d+$/)
          ]
        ],
        facebook: ['', []],
        twitter: ['', []],
        snapchat: ['', []],
        instagram: ['', []]
      },
      { validator: this.matchingPasswords('password', 'confirm') }
    );
  }

  onSubmit() {
    console.log(this.studentForm.value);
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 3000);
  }

  max() {
    this.allowed = this.studentForm.get('quote').value;
    console.log(this.allowed.length);
    this.allowedlength = this.allowed.length;
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
  get phone() {
    return this.studentForm.get('phone');
  }
  get department() {
    return this.studentForm.get('department');
  }

  matchingPasswords(password, confirm) {
    return (group: FormGroup) => {
      if (group.controls[password].value === group.controls[confirm].value) {
        return null;
      } else {
        return { matchingPasswords: true };
      }
    };
  }
}
