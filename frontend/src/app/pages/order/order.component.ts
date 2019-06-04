import { Component, OnInit } from '@angular/core';
import { HotelService } from 'src/app/services/hotel/hotel.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  orders: any;

  constructor(private hotelService: HotelService) { }

  ngOnInit() {
    this.hotelService.reserved().subscribe((res) => {
      this.orders = res;
    }, (err) => {
      console.log(err);
    });
  }

}
