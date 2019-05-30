import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HotelService } from 'src/app/services/hotel/hotel.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  form: FormGroup;

  constructor(private hotelService: HotelService) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      location: new FormControl(),
      checkin: new FormControl(),
      checkout: new FormControl(),
      people: new FormControl()
    })
  }

  search(formValues: any) {
    console.log(formValues);
  }
}
