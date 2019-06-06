import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  api = '';
  //Below line for development above for build
  //api = 'http://localhost:3000';
  httpOptions;

  constructor(private http: HttpClient) { }

  send(values: any) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'X-Requested-With': 'application/json',
      })
    };

    return this.http.post(`${this.api}/api/contact`, {
      fname: values.fname,
      lname: values.lname,
      email: values.email,
      message: values.message
    }, this.httpOptions);
  }

  getContacts() {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'X-Requested-With': 'application/json',
        authorization: `Bearer ${environment.token}`
      })
    };

    return this.http.get(`${this.api}/api/contact`, this.httpOptions);
  }
}
