import { Component, OnInit } from '@angular/core';
import { MailService } from '../../services/mail.service';
import { FlashMessagesService } from 'angular2-flash-messages';


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

  constructor(private mailService: MailService,
              private flash: FlashMessagesService) { }

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
      this.flash.show('A valid email address is required.',{cssClass: 'flash-warning', timeout: 2000});
      return false;
    }
    this.mailService.storeContact(data).subscribe(results => {
      if (results) {
        this.flash.show('Your contact information has been sent to a Realtor.  Thank You!',{cssClass: 'flash-success', timeout: 4000});
      }

    });
  }

}
