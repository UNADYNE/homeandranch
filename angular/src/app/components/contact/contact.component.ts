import { Component, OnInit } from '@angular/core';
import { MailService } from '../../services/mail.service';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})

export class ContactComponent implements OnInit {

  firstName: String;
  lastName: String;
  email: String;
  phoneNumber: String;
  message: String;

  constructor(private mailService: MailService) { }

  ngOnInit() {
  }

  onSubmitContact() {
    const data = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phoneNumber: this.phoneNumber,
      message: this.message
    };

    if(!this.mailService.validateEmail(data.email)){
      console.log("valid email required");
      return false;
    }
    this.mailService.storeContact(data).subscribe(results => {
      if (results) {
        console.log(results);
      }
    });
  }

}
