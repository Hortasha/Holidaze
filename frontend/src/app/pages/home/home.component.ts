import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HotelService } from 'src/app/services/hotel/hotel.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  form: FormGroup;
  advanced = false;
  hotels: any;
  allHotels: any;

  rooms: any;
  allRooms: any;

  constructor(
    private hotelService: HotelService,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      location: new FormControl(),
      checkin: new FormControl(),
      checkout: new FormControl(),
      people: new FormControl()
    });

    this.hotelService.getHotels().subscribe((res) => {
      this.hotels = res;
      this.allHotels = res;
    }, (err) => {
      console.log(err);
    });
  }

  search(event: any) {
    this.hotels = this.allHotels.filter((hotel) => {
      return hotel.name.toLowerCase().trim().includes(event.target.value.toLowerCase().trim());
    });
  }

  searchRoom(formValues: any) {
    this.hotelService.getSearch(formValues).subscribe((res) => {
      this.rooms = res;
    }, (err) => {
      console.log(err);
    });
  }

  toggleSearch() {
    this.advanced = !this.advanced;
    this.hotels = this.allHotels;

    this.hotelService.getSearch({}).subscribe((res) => {
      this.rooms = res;
    }, (err) => {
      console.log(err);
    });
  }
}
