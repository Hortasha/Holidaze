import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HotelService } from 'src/app/services/hotel/hotel.service';
import { environment } from './../../../environments/environment';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { toDate } from '@angular/common/src/i18n/format_date';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {
  urlId: any;
  room: any;
  env = environment;

  form: FormGroup;
  success = false;
  regFail = false;

  constructor(
    private hotelService: HotelService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.urlId = params.roomid;
    });
    this.hotelService.getRoomById(this.urlId).subscribe((res) => {
      this.room = res[0];
    }, (err) => {
      console.log(err);
    });

    this.form = new FormGroup({
      from: new FormControl('', [
        Validators.required
      ]),
      to: new FormControl('', [
        Validators.required
      ])
    });
  }

  register(formValues: any) {
    if (new Date(formValues.from) >= new Date(formValues.to)
    || new Date(formValues.from) <= new Date()) {

      this.regFail = true;

    } else {
      this.hotelService.reserve(this.urlId, formValues).subscribe((res) => {
        this.success = true;
        console.log(res);
      }, (err) => {
        console.log(err);
        this.regFail = true;
      });

    }
  }

}
