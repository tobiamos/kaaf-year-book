import { Component, OnInit } from '@angular/core';
import { IStudent } from './student';
import { ToastrService } from 'ngx-toastr';
import { StudentService } from '../services/student.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  date = Date.now();
  public toastConfig = {
    closeButton: true,
    progressBar: true
  };
  student;
  // student = {
  //   name: 'Amos Tobi',
  //   indexNumber: 24100513,
  //   email: 'tobi@gmail.com',
  //   department: 'Electrical',
  //   quote: 'All is well that ends well',
  //   phone: '0205837980',
  //   facebook: 'ridick12',
  //   twitter: 'tobideveloper',
  //   snapchat: 'tobidev',
  //   instagram: 'tobi_amos',
  //   messages: [
  //     { _id: 1, text: 'i love the way you dress' },
  //     { _id: 2, text: 'Mans not hot 🔥🔥🔥' },
  //     { _id: 3, text: 'bangdadadang 🔫🔫🔫' }
  //   ]
  // };

  constructor(
    private toastr: ToastrService,
    private _student: StudentService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getProfile();
  }

  getProfile() {
    this._student.getProfile().subscribe(
      data => {
        this.toastr.success('Profile Sync Successful', '', this.toastConfig);
        this.student = data;
        // console.log(data);
      },
      error => {
        this.toastr.error(`${error.message}`, '', this.toastConfig);
        // console.error(error);
      }
    );
  }
  studentLogout() {
    this._student.logout();
    this.router.navigate(['/']);
    this.toastr.success(`You have been logged out successfully`, '', this.toastConfig);

  }
  deleteMessage(id, indexNumber) {
    const index = this.student.messages.findIndex(num => {
      return num._id === id;
    });
    this._student.deleteMessage(id, indexNumber).subscribe(
      data => {
        this.toastr.success(`${data}`, '', this.toastConfig);
        console.log(data);
      },
      error => {
        this.toastr.error(`${error}`, '', this.toastConfig);
        console.error(error);
      }
    );
    this.student.messages.splice(index, 1);
  }
}
