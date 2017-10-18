import { Component, OnInit } from '@angular/core';
import { IStudent } from './student';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  date = Date.now();
  student = {
    name: 'Amos Tobi',
    indexNumber: 24100513,
    email: 'tobi@gmail.com',
    department: 'Electrical',
    quote: 'All is well that ends well',
    phone: '0205837980',
    facebook: 'ridick12',
    twitter: 'tobideveloper',
    snapchat: 'tobidev',
    instagram: 'tobi_amos',
    messages: [
      { _id: 1, text: 'i love the way you dress' },
      { _id: 2, text: 'Mans not hot 🔥🔥🔥' },
      { _id: 3, text: 'bangdadadang 🔫🔫🔫' }
    ]
  };

  constructor() {}

  ngOnInit() {}

  deleteMessage(id) {
    const index = this.student.messages.findIndex(num => {
      return num._id === id;
    });
    this.student.messages.splice(index, 1);
  }
}
