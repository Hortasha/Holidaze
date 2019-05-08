import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { RegistrationService } from 'src/app/services/registration/registration.service';
import { FormGroup, FormControl } from '@angular/forms';
import { UserModel } from 'src/app/models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  @Output() onReg: EventEmitter<boolean>;
  form: FormGroup;

  constructor(private regService: RegistrationService) {
    this.onReg = new EventEmitter<boolean>();
  }

  ngOnInit() {
    this.form = new FormGroup({
      username: new FormControl(),
      password: new FormControl(),
      email: new FormControl(),
      phone: new FormControl(),
      card: new FormControl(),
      type: new FormControl()
    })
  }

  register(formValues: UserModel) {
    this.regService.register(formValues).subscribe(res => console.log(res));
  }
}
