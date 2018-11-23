import {Component, OnInit} from '@angular/core';
import {SearchService} from "../../services/search.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  contacts: any[];
  downLoadedProperties: number;

  constructor(private searchService: SearchService) {
  }

  ngOnInit() {
    this.getContacts();
  }

  getContacts() {
    this.searchService.getAllContacts().subscribe(contacts => {
      this.contacts = contacts.contacts;
    });
  }

  downloadProperties() {
    this.searchService.deleteAllProperties().subscribe(results => {
      console.log(results);
    });
    setTimeout(() => {
      this.searchService.downloadProperties().subscribe(properties => {
        console.log(properties.data.count);
      });
    }, 1000);

  }


}
