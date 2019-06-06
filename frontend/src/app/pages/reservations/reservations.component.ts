import { Component, OnInit } from '@angular/core';
import { HotelService } from 'src/app/services/hotel/hotel.service';
import { environment } from './../../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent implements OnInit {
  reserved: any;

  constructor(
    private hotelService: HotelService,
    private router: Router
  ) { }

  ngOnInit() {
    if(environment.token === '') {
      this.router.navigateByUrl('/login');
    }

    this.hotelService.reserved().subscribe((res) => {
      this.reserved = res;
    }, (err) => {
      console.log(err);
    });
  }
}
