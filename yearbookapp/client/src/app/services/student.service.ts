import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class StudentService {
  route = `http://localhost:3000/api`;
  authToken;
  options;
  constructor(private _http: Http) {}

  createStudent(student) {
    return this._http
      .post(`${this.route}/signup`, student)
      .map(res => res.json())
      .catch(this.handleError);
  }
  loggedIn() {
    return tokenNotExpired();
  }

  checkEmail(email) {
    return this._http
      .get(`${this.route}/checkemail/${email}`)
      .map(res => res.json())
      .catch(this.handleError);
  }

  checkIndexNumber(indexNumber) {
    return this._http
      .get(`${this.route}/indexnumber/${indexNumber}`)
      .map(res => res.json())
      .catch(this.handleError);
  }

  getProfile() {
    const options = this.getAuthHeaders();
    return this._http
      .get(`${this.route}/profile`, options)
      .map(res => res.json())
      .catch(this.handleError);
  }
  deleteMessage(messageId, indexNumber) {
    const options = this.getAuthHeaders();
    return this._http
      .delete(
        `${this.route}/message/${messageId}?index=${indexNumber}`,
        options
      )
      .map(res => res.json())
      .catch(this.handleError);
  }

  loginStudent(student) {
    return this._http
      .post(`${this.route}/login`, student)
      .map(res => res.json())
      .catch(this.handleError);
  }

  getIndexNumber(indexNumber) {
    return this._http
      .get(`${this.route}/index/${indexNumber}`)
      .map(res => res.json())
      .catch(this.handleError);
  }
  addMessage(indexNumber, message) {
    return this._http
      .post(`${this.route}/message/${indexNumber}`, message)
      .map(res => res.json())
      .catch(this.handleError);
  }

  getAuthHeaders() {
    const headers = new Headers();
    this.authToken = localStorage.getItem('token');
    headers.append('Content-Type', 'application/json');
    headers.append('authorization', `${this.authToken}`);
    return new RequestOptions({ headers });
  }
  storeUserData(token) {
    localStorage.setItem('token', token);
    this.authToken = token;
  }
  logout() {
    this.authToken = null;
    localStorage.clear();
  }

  private handleError(error: Response) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(error);
    return Observable.throw(error.json() || 'Server error');
  }
}
