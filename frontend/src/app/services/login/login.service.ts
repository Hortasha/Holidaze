import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  api: string = 'http://localhost:3000';

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type":  "application/json",
      "X-Requested-With": "application/json"
    })
  }

  constructor(private http: HttpClient) { }

  login(values: any) {
    return this.http.post(`${this.api}/api/login`, {
      "username": values.username,
      "password": values.password
    }, this.httpOptions);
  }
}
