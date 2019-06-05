import { Component, OnInit } from '@angular/core';
import { environment } from './../../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mypage',
  templateUrl: './mypage.component.html',
  styleUrls: ['./mypage.component.scss']
})
export class MypageComponent implements OnInit {

  type = environment.type;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    if (environment.token === '') {
      /*this.router.navigateByUrl('/login');*/
    }
  }

  orders() {
    this.router.navigateByUrl('/orders');
  }

  createHotel() {
    this.router.navigateByUrl('/createhotel');
  }

  createRoom() {
    this.router.navigateByUrl('/createroom');
  }

  reservations() {
    this.router.navigateByUrl('/reservation');
  }

  contact() {
    this.router.navigateByUrl('/results');
  }

  home() {
    this.router.navigateByUrl('');
  }
}
