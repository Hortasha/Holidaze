import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  api = 'http://localhost:3000';
  httpOptions;


  constructor(private http: HttpClient) { }

  createHotel(values: any) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'X-Requested-With': 'application/json',
        authorization: `Bearer ${environment.token}`
      })
    };

    return this.http.post(`${this.api}/api/hotels`, {
      name: values.name,
      location: values.location,
      image: values.image
    }, this.httpOptions);
  }

  getHotels() {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'X-Requested-With': 'application/json',
        authorization: `Bearer ${environment.token}`
      })
    };

    return this.http.get(`${this.api}/api/hotels`, this.httpOptions);
  }

  getMyHotels() {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'X-Requested-With': 'application/json',
        authorization: `Bearer ${environment.token}`
      })
    };

    return this.http.get(`${this.api}/api/hotels/self`, this.httpOptions);
  }

  createRoom(values: any) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'X-Requested-With': 'application/json',
        authorization: `Bearer ${environment.token}`
      })
    };

    return this.http.post(`${this.api}/api/rooms`, {
      type: values.type,
      hotelId: values.hotel,
      beds: values.beds,
      max_occupancy: values.max_occupancy,
      price: values.price,
      image: values.image
    }, this.httpOptions);
  }
}
