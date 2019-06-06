import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserModel } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  api = '';
  //api = 'http://localhost:3000';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'X-Requested-With': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }

  register(values: UserModel) {
    return this.http.post(`${this.api}/api/users/register`, {
      username: values.username,
      password: values.password,
      email: values.email,
      phone: values.phone,
      card: values.card,
      type: values.type
    }, this.httpOptions);
  }
}
