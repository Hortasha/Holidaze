import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  form: FormGroup;

  constructor() { }

  ngOnInit() {
    this.form = new FormGroup({
      fname: new FormControl(),
      lname: new FormControl(),
      mail: new FormControl(),
      message: new FormControl()
    })
  }

  send(formValues: any) {
    console.log(formValues);
  }
}
