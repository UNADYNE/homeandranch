import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ViewChildren,
  QueryList,
  ElementRef,
} from '@angular/core';
import {SearchService} from 'src/app/services/search.service';
import {environment} from '../../../environments/environment';
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {AgmMarker} from "@agm/core";
import {MatDialog} from '@angular/material';
import {PropertyComponent} from "../property/property.component";
import {ListnoDirective} from '../../directives/listno.directive';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit, AfterViewInit {
  @ViewChild('areaFilterElm') areaFilterElm: ElementRef;
  @ViewChild("map") mapElm: ElementRef;
  @ViewChildren('marker') marker: QueryList<AgmMarker>;
  @ViewChild('listingItem') listingItem: ElementRef;

  lat: number;
  long: number;
  bgImage: any;
  properties: any[];
  apiUrl: string = environment.apiUrl;
  areaFilters: string;
  iconUrl: string = `http://localhost:8080/assets/images/icon_house.png`;
  filteredProperties: any;
  sanitizedImageUrls: any[];

  constructor(private searchService: SearchService,
              private sanitizer: DomSanitizer,
              public _marker: AgmMarker,
              public dialog: MatDialog
  ) {
  }


  ngOnInit() {
    this.initMap();
  }

  ngAfterViewInit() {

  }


  processAreaFilter(): String {
    let filter = {
      query: '',
      value: ''
    };
    if (this.areaFilters[0] + this.areaFilters[1] === '84') {
      filter.query = 'zip';
      filter.value = this.areaFilters;
    }
    let _query = `?${filter.query}=${filter.value}`;
    this.areaFilterElm.nativeElement.text = '';
    this.areaFilterElm.nativeElement.value = '';
    if (_query.length <= 0) {
      return null;
    } else {
      return _query;
    }
  }

  formatCurrency(str): string {
    let _str = str.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,').split('.')[0];
    return `$${_str}`;
  }

  processDataStrings(data) {
    for (let i = 0; i < data.length; i++) {
      data[i].listprice = this.formatCurrency(data[i].listprice);
      data[i].totbath = data[i].totbath.split('.')[0];
      data[i].address = `${data[i].housenum} ${data[i].dirpre} ${data[i].street} ${data[i].dirpost}${data[i].streettype} ${data[i].city}`
    }
  }

  processAllFilters(): String {
    const _areaFilters = this.processAreaFilter();
    return `${_areaFilters}`;
  }


  initMap() {
    const query = `?zip=84404`;
    this.searchService.getProperties(query).subscribe(data => {
      this.processDataStrings(data.data);
      this.properties = data.data;
    });
  }

  testSani(url): SafeHtml {
    return this.sanitizer.bypassSecurityTrustStyle(`url(${url})`);
  }

  getProperties() {
    const queryString = this.processAllFilters();
    this.searchService.getProperties(queryString).subscribe(res => {
      this.processDataStrings(res.data);
      this.properties = res.data;
      // console.log(res.data);
    });
  }

  //MAP FUNCTIONALITY
  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        this.lat = pos.coords.latitude;
        this.long = pos.coords.longitude;
      });
    }
  }

  loadProperty(event) {
    const query = `?listno=${event.target.title}`;
    const finalProp = {};
    this.searchService.getProperties(query).subscribe(data => {
      this.processDataStrings(data.data[0]);
      data.data[0].listprice = this.formatCurrency(data.data[0].listprice);
      localStorage.setItem('prop', JSON.stringify(data.data[0]));
    });
    setTimeout(() => {
      this.openDialog();
    }, 300);
  }

  block(event) {
    event.preventDefault();
  }


  openInfoWindow(e) {
    console.log(e);
  }

  test(e) {
    const listing = document.getElementById(e.title);
    // const listingImg = listing.firstChild.getAttribute('src');
    listing.scrollIntoView(true);
    listing.classList.add('highlighted-listing');
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PropertyComponent, {
      width: '80vw',
      height: '90vh'
    });
  }


  /* TODO create listing component to pop-up in a modal when clicked either on map or sidebar*/
}
