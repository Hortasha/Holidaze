import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  //api = '';
  //Below line for development above for build
  api = 'http://localhost:3003';
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

  getRoomsByHotel(id) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'X-Requested-With': 'application/json'
      })
    };
    return this.http.get(`${this.api}/api/hotel/rooms/${id}`, this.httpOptions);
  }

  getHotelById(id) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'X-Requested-With': 'application/json'
      })
    };
    return this.http.get(`${this.api}/api/hotels/${id}`, this.httpOptions);
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

  getSearch(values: any) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'X-Requested-With': 'application/json'
      })
    };

    let quary = '';
    if (values.people) {
      quary += `people=${values.people}&`;
    }
    if (values.location) {
      quary += `location=${values.location}&`;
    }
    if (values.checkin) {
      quary += `from=${values.checkin}&`;
    }
    if (values.checkout) {
      quary += `to=${values.checkout}&`;
    }

    return this.http.get(`${this.api}/api/rooms?${quary}`, this.httpOptions);
  }

  getRoomById(id) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'X-Requested-With': 'application/json'
      })
    };
    return this.http.get(`${this.api}/api/rooms/${id}`, this.httpOptions);
  }

  reserve(id, values) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'X-Requested-With': 'application/json',
        authorization: `Bearer ${environment.token}`
      })
    };

    return this.http.post(`${this.api}/api/rooms/reserve`, {
      roomId: id,
      from: values.from,
      to: values.to
    }, this.httpOptions);
  }

  reserved() {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'X-Requested-With': 'application/json',
        authorization: `Bearer ${environment.token}`
      })
    };

    return this.http.get(`${this.api}/api/reservations`, this.httpOptions);

  }
}
