import { Component, OnInit } from '@angular/core';
import { HotelService } from 'src/app/services/hotel/hotel.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { environment } from './../../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createroom',
  templateUrl: './createroom.component.html',
  styleUrls: ['./createroom.component.scss']
})
export class CreateroomComponent implements OnInit {
  hotels: any = [];
  form: FormGroup;
  regFail = false;
  success = false;

  constructor(
    private hotelService: HotelService,
    private router: Router
  ) { }

  ngOnInit() {

    if(environment.token === '') {
      this.router.navigateByUrl('/login');
    }

    this.form = new FormGroup({
      type: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15),
        Validators.pattern('[a-zA-Z ]*')
      ]),
      hotel: new FormControl('', [
        Validators.required
      ]),
      max_occupancy: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]')
      ]),
      beds: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]')
      ]),
      image: new FormControl(),
      price: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]*')
      ])
    });
    this.hotelService.getMyHotels().subscribe((res) => {
      this.hotels = res;

      if (this.hotels.length > 0) {
        this.form.controls['hotel'].setValue(this.hotels[0]._id, {onlySelf: true});
      }
    });
  }


  register(formValues: any) {
    this.hotelService.createRoom(formValues).subscribe((res) => {
      this.success = true;
    }, (err) => {
      this.regFail = true;
      console.log(err);
    });
  }
}
