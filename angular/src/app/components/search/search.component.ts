import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ViewChildren,
  QueryList,
  ElementRef,
  HostListener
} from '@angular/core';
import {SearchService} from 'src/app/services/search.service';
import {environment} from '../../../environments/environment';
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {AgmMarker} from "@agm/core";
import {MatDialog} from '@angular/material';
import {PropertyComponent} from "../property/property.component";
import {faArrowAltCircleUp} from "@fortawesome/free-regular-svg-icons/faArrowAltCircleUp";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit, AfterViewInit {

  /* TODO clean up ViewChild Properties */
  @ViewChild('areaFilterElem') areaFilterElem: ElementRef;
  @ViewChild('sideListings') sideListings: ElementRef;
  @ViewChild("map") mapElm: ElementRef;
  @ViewChildren('marker') marker: QueryList<AgmMarker>;
  @ViewChild('listingItem') listingItem: ElementRef;
  @ViewChild('backToTop') backToTop: ElementRef;
  @HostListener('window:resize', ['$event']) onResize(event?) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
  }
  @HostListener('window:load', ['$event'])onLoad(event?) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
  }

  lat: number;
  long: number;
  screenHeight: any;
  screenWidth: any;
  properties: any[];
  apiUrl: string = environment.apiUrl;
  areaFilters: string;
  iconUrl: string = `../../assets/images/icon_house.png`;
  faArrowAltCircleUp = faArrowAltCircleUp;
  queryParams: any;

  constructor(private searchService: SearchService,
              private sanitizer: DomSanitizer,
              public _marker: AgmMarker,
              public dialog: MatDialog,
              private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
      this.queryParams = params.params;
    })
  }


  ngOnInit() {
    if(JSON.parse(localStorage.getItem(`coords`)).lat.toString() > 1){
      this.lat = JSON.parse(localStorage.getItem(`coords`)).lat;
      this.long = JSON.parse(localStorage.getItem(`coords`)).lng;
    } else {
      this.lat = 41.03522159999999;
      this.long = -111.93855209999998;
    }
  }

  ngAfterViewInit() {
    this.backToTop.nativeElement.style.display = 'none';
    this.initMap();
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
    this.areaFilterElem.nativeElement.value = '';
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

  // set query string based on user input
  processAllFilters(): String {
    const _areaFilters = this.processAreaFilter();
    return `${_areaFilters}`;
  }

// initialize map centered on ogden
  initMap() {
    let query = ``;
    if(this.queryParams > 2) {
      query = this.queryParams;
    } else {
      query = `?zip=84101`;
    }

    this.searchService.getProperties(this.queryParams).subscribe(data => {
      this.processDataStrings(data.data);
      this.properties = data.data;
    });
  }
// sanitize live linked pics
  /* TODO download pics to db and strip tracking code */
  testSani(url): SafeHtml {
    return this.sanitizer.bypassSecurityTrustStyle(`url(${url})`);
  }

  // retrieve properties from db
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

  //load specific property into the local storage
  loadProperty(event) {
    const query = `?listno=${event.target.title}`;
    const finalProp = {};
    this.searchService.getProperties(query).subscribe(data => {
      this.processDataStrings(data.data[0]);
      data.data[0].listprice = this.formatCurrency(data.data[0].listprice);
      localStorage.setItem('prop', JSON.stringify(data.data[0]));
    });

    // buffer timer for utahrealestate.com's laggy-ass server
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

  // open modal dialog for specific property on click
  openDialog(): void {
    if (this.screenWidth <= 800) {
      const dialogRef = this.dialog.open(PropertyComponent, {
        minWidth: '100vw',
        height: '100vh'
      });
    } else {
      const dialogRef = this.dialog.open(PropertyComponent, {
        minWidth: '90vw',
        height: '90vh'
      });
    }
  }

  // Show Back To Top Icon
  showBacToTop() {
    this.backToTop.nativeElement.style.display = 'block';
    setTimeout(() => {
      this.backToTop.nativeElement.style.display = 'none';
    }, 2500);
  }

  // Scroll .side-listings div back to top
  scrollToTop() {
    this.sideListings.nativeElement.scroll(0, 0);
  }

  /* TODO create listing component to pop-up in a modal when clicked either on map or sidebar*/
}
