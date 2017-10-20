import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../services/student.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  messageForm: FormGroup;
  studentName;
  indexNumber;
  public toastConfig = {
    closeButton: true,
    progressBar: true
  };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private _student: StudentService,
    private toastr: ToastrService
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.verify();
  }

  verify() {
    const indexNumber = this.route.snapshot.params['indexnumber'];
    this._student.getIndexNumber(indexNumber).subscribe(
      data => {
        this.toastr.success(`${data}`, '', this.toastConfig);
        this.studentName = data.name;
        this.indexNumber = data.indexNumber;
        // console.log(data);
      },
      error => {
        this.toastr.error(`${error}`, '', this.toastConfig);
        console.error(error);
        this.router.navigate(['/']);
      }
    );
  }
  createForm() {
    this.messageForm = this.fb.group({
      name: [
        '',
        [Validators.required, Validators.maxLength(15), Validators.minLength(4)]
      ],
      text: ['', [Validators.required, Validators.maxLength(140)]]
    });
  }

  get name() {
    return this.messageForm.get('name');
  }

  get message() {
    return this.messageForm.get('message');
  }

  onSubmit() {
    // console.log(this.messageForm.value);
    const message = this.messageForm.value;
    this._student.addMessage(this.indexNumber, message).subscribe(
      data => {
        this.toastr.success(`${data}`, '', this.toastConfig);
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 2000);
      },
      error => {
        this.toastr.error(`${error}`, '', this.toastConfig);
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 2000);
      }
    );
  }
}
