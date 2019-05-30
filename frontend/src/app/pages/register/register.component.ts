import { Component, OnInit, Input } from '@angular/core';
import { RegistrationService } from 'src/app/services/registration/registration.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserModel } from 'src/app/models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  form: FormGroup;
  regFail = false;
  types: string[] = ['User', 'Hotel'];
  success = false;

  constructor(private regService: RegistrationService) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(12),
        Validators.pattern('[a-zA-Z]*')
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20)
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9 ]*')
      ]),
      card: new FormControl('', [
        Validators.pattern('[0-9]*')
      ]),
      type: new FormControl()
    });
    this.form.controls['type'].setValue(this.types[0], {onlySelf: true});
  }

  register(formValues: UserModel) {
    this.regService.register(formValues).subscribe((res) => {
      this.success = true;
    },
    (err) => {
      this.regFail = true;
      console.log(err);
    });
  }
}
