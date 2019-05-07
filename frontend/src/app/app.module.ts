import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { NavComponent } from './components/nav/nav.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ResultComponent } from './pages/result/result.component';
import { HotelComponent } from './pages/hotel/hotel.component';
import { RoomComponent } from './pages/room/room.component';
import { BookingComponent } from './pages/booking/booking.component';
import { MypageComponent } from './pages/mypage/mypage.component';
import { OrderComponent } from './pages/order/order.component';
import { CreateroomComponent } from './pages/createroom/createroom.component';
import { CreatehotelComponent } from './pages/createhotel/createhotel.component';
import { ReservationsComponent } from './pages/reservations/reservations.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NavComponent,
    ContactComponent,
    ResultComponent,
    HotelComponent,
    RoomComponent,
    BookingComponent,
    MypageComponent,
    OrderComponent,
    CreateroomComponent,
    CreatehotelComponent,
    ReservationsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
