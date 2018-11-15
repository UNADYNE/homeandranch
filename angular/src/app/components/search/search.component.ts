import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, AfterViewInit {
  properties: any[];
  apiUrl: string = environment.apiUrl;

  constructor(private searchService: SearchService) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.getProperties();
  }

  getProperties() {
    this.searchService.getProperties().subscribe(res => {
      const tempArray = [];
      if (res.response === 200) {
        for (let i = 0; i < res.data.results.length; i++) {
          res.data.results[i].bathrooms = res.data.results[i].bathrooms.split('.')[0];
          tempArray.push(res.data.results[i]);
        }
        this.properties = tempArray;
        console.log(this.properties[0]);
      }
    });
  }

  /* TODO create listing component to pop-up in a modal when clicked either on map or sidebar*/
}
