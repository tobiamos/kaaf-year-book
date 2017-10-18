import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  messageForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.createForm();
  }

  ngOnInit() {}

  createForm() {
    this.messageForm = this.fb.group({
      name: [
        '',
        [Validators.required, Validators.maxLength(15), Validators.minLength(4)]
      ],
      message: ['', [Validators.required, Validators.maxLength(140)]]
    });
  }

  get name() {
    return this.messageForm.get('name');
  }

  get message() {
    return this.messageForm.get('message');
  }

  onSubmit() {
    console.log(this.messageForm.value);
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 2000);
  }
}
