import { Component, OnInit } from '@angular/core';
import { HotelService } from 'src/app/services/hotel/hotel.service';
import { Router } from '@angular/router';
import { environment } from './../../../environments/environment';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  orders: any;

  constructor(
    private hotelService: HotelService,
    private router: Router
  ) { }

  ngOnInit() {

    if(environment.token === '') {
      this.router.navigateByUrl('/login');
    }

    this.hotelService.reserved().subscribe((res) => {
      console.log(res);
      this.orders = res;
    }, (err) => {
      console.log(err);
    });
  }
}
