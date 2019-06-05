import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ContactService } from 'src/app/services/contact/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  form: FormGroup;
  regFail = false;
  success = false;


  constructor(private contactService: ContactService) { }

  ngOnInit() {
    this.form = new FormGroup({
      fname: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z ]*')
      ]),
      lname: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z ]*')
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      message: new FormControl('', [
        Validators.required
      ])
    })
  }

  send(formValues: any) {
    this.contactService.send(formValues).subscribe((res) => {
      this.success = true;
    }, (err) => {
      this.regFail = true;
      console.log(err);
    });
  }
}
