import { Component, OnInit } from '@angular/core';
import { HotelService } from 'src/app/services/hotel/hotel.service';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent implements OnInit {
  reserved: any;

  constructor(private hotelService: HotelService) { }

  ngOnInit() {
    this.hotelService.reserved().subscribe((res) => {
      this.reserved = res;
    }, (err) => {
      console.log(err);
    });
  }
}
