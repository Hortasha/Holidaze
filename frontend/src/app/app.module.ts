//Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

//Components
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

//Services
import { LoginService } from './services/login/login.service';
import { RegistrationService } from './services/registration/registration.service';
import { HotelService } from './services/hotel/hotel.service';
import { OrderService } from './services/order/order.service';
import { RegisterSuccessComponent } from './components/register-success/register-success.component';
import { CreateSuccessComponent } from './components/create-success/create-success.component';

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
    ReservationsComponent,
    RegisterSuccessComponent,
    CreateSuccessComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    LoginService,
    RegistrationService,
    HotelService,
    OrderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
