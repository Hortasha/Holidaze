import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { MypageComponent } from './pages/mypage/mypage.component';
import { OrderComponent } from './pages/order/order.component';
import { ReservationsComponent } from './pages/reservations/reservations.component';
import { BookingComponent } from './pages/booking/booking.component';
import { ContactComponent } from './pages/contact/contact.component';
import { HotelComponent } from './pages/hotel/hotel.component';
import { RoomComponent } from './pages/room/room.component';
import { CreatehotelComponent } from './pages/createhotel/createhotel.component';
import { CreateroomComponent } from './pages/createroom/createroom.component';
import { ResultComponent } from './pages/result/result.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'mypage', component: MypageComponent},
  { path: 'orders', component: OrderComponent},
  { path: 'reservation', component: ReservationsComponent},
  { path: 'booking', component: BookingComponent},
  { path: 'contact', component: ContactComponent},
  { path: 'hotel/:hotelid', component: HotelComponent},
  { path: 'room/:roomid', component: RoomComponent},
  { path: 'createhotel', component: CreatehotelComponent},
  { path: 'createroom', component: CreateroomComponent},
  { path: 'results', component: ResultComponent},
  { path: '', component: HomeComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
