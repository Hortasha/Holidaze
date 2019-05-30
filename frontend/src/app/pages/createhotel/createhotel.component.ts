import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HotelService } from 'src/app/services/hotel/hotel.service';

@Component({
  selector: 'app-createhotel',
  templateUrl: './createhotel.component.html',
  styleUrls: ['./createhotel.component.scss']
})
export class CreatehotelComponent implements OnInit {
  form: FormGroup;
  regFail = false;
  success = false;

  constructor(private hotelService: HotelService) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15),
        Validators.pattern('[a-zA-Z ]*')
      ]),
      location: new FormControl('', [
        Validators.required
      ]),
      image: new FormControl(),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9 ]*')
      ])
    });
  }

  register(formValues: any) {
    this.hotelService.createHotel(formValues).subscribe((res) => {
      this.success = true;
    },
    (err) => {
      this.regFail = true;
      console.log(err);
    });
  }
}
