import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HotelService } from 'src/app/services/hotel/hotel.service';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.scss']
})
export class HotelComponent implements OnInit {
  rooms: any;
  hotel: any;
  urlId: any;

  constructor(
    private hotelService: HotelService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.urlId = params.hotelid;
    });

    this.hotelService.getRoomsByHotel(this.urlId).subscribe((res) => {
      this.rooms = res;
    }, (err) => {
      console.log(err);
    });

    this.hotelService.getHotelById(this.urlId).subscribe((res) => {
      this.hotel = res[0];
    }, (err) => {
      console.log(err);
    });
  }

}
