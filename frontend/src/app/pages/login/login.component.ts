import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Output() onLogin: EventEmitter<boolean>;
  form: FormGroup;

  constructor(private loginService: LoginService) {
    this.onLogin = new EventEmitter<boolean>();
  }

  ngOnInit() {
    this.form = new FormGroup({
      username: new FormControl(),
      password: new FormControl()
    })
  }

  login(formValues: any) {
    this.loginService.login(formValues).subscribe(res => console.log(res));
  } 

}
