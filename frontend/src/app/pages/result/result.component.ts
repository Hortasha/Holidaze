import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/services/contact/contact.service';
import { environment } from './../../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  contacts: any;

  constructor(
    private contactService: ContactService,
    private router: Router
  ) { }

  ngOnInit() {

    if(environment.token === '') {
      this.router.navigateByUrl('/login');
    }

    this.contactService.getContacts().subscribe((res) => {
      this.contacts = res;
    }, (err) => {
      console.log(err);
    });
  }
}
