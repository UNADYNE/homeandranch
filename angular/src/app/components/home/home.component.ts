import {AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewChildren, ViewEncapsulation} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit, AfterViewInit {
  //query selectors
  @ViewChildren("slide")
  slide;

  @ViewChild('selectedOption') selectedOption: ElementRef;

  slideArray: any[];

  current: number = 0;
  animationTimer: number = 1100;

  gte: string;
  lte: string;
  // used to create options in property types select element
  propertyTypes: any[];
  propType: string;
  form: FormGroup;
  geoSettings: any;
  geoQueryString: string;
  searchQueryString: string;

  constructor(private router: Router) {
    this.geoSettings = {
      inputPlaceholderText: 'City, County, or Zip Code in Utah',
      showSearchButton: false,
      geoTypes: ['(regions)', '(cities)'],
      showCurrentLocation: false
    };
  }

  ngOnInit() {

    this.propertyTypes = [
      {type: 'Single Family'},
      {type: 'Condo'},
      {type: 'Townhouse'}
    ];
  }

  ngAfterViewInit() {
    this.slideArray = this.slide.toArray();
    this.startSlide();
  }

  //<editor-fold desc="slide functionality">
  reset() {
    for (let i = 0; i < this.slideArray.length; i++) {
      this.slideArray[i].nativeElement.style.display = "none";
      // this.slideArray[i].nativeElement.classList.remove("zoom");
      this.slideArray[i].nativeElement.classList.remove("fade-in");
      this.slideArray[i].nativeElement.style.opacity = "0";
    }
  }

  startSlide() {
    this.reset();
    this.slideArray[0].nativeElement.style.display = "block";
    this.slideShow();
    this.slideInterval();
  }

  slideShow() {
    this.reset();
    this.slideArray[this.current].nativeElement.style.display = "block";
    this.slideArray[this.current].nativeElement.classList.add("fade-in");
    setTimeout(() => {
      this.slideArray[this.current].nativeElement.style.opacity = "1";
      this.slideArray[this.current].nativeElement.classList.remove("fade-in");
      // this.slideArray[this.current].nativeElement.classList.add("zoom");
    }, this.animationTimer);
    // console.log("slideShow()");
  }

  doSlideShow() {
    if (this.current === 0) {
      this.current = this.slideArray.length;
      this.reset();
    }
    this.current--;
    this.slideShow();
  }

  slideInterval() {
    setInterval(() => {
      this.doSlideShow();
      // console.log("slideInterval()");
    }, 6000);
  }

  // </editor-fold>

  // Process user input to build a query
  processInput() {
    let queryStr = '?';
    if (this.gte && this.gte.length > 0) {
      queryStr += `gte=${this.gte}&`;
    }
    if(this.lte && this.lte.length > 0) {
      queryStr += `lte=${this.lte}&`;
    }
    if(this.propType && this.propType.length > 0) {
      queryStr += `proptype=${this.propType.trim().replace(/ /g, '%20')}&`;
    }
    if(this.geoQueryString.length > 0) {
      queryStr += `${this.geoQueryString}&`;
    }
    this.searchQueryString = queryStr.slice(0, -1);
    console.log(this.searchQueryString);
  }

  // store query string in LS and navigate to /search where query string will be used
  //for search params
  searchProperties() {
    this.processInput();
    this.router.navigate([`/search/${this.searchQueryString}`]);
  }

  geoCallback(e: any) {
    let _type = e.data.types[0];
    let queryObj = {
      query: '',
      value: ''
    };
    let query = '';
    const longName = e.data.address_components[0].long_name;
    switch (_type) {
      case 'locality': {
        Object.assign(queryObj, {
          query: 'city',
          value: longName
        });
        query = `${queryObj.query}=${queryObj.value}`;
        break;
      }
      case 'administrative_area_level_2' : {
        Object.assign(queryObj, {
          query: 'countycode',
          value: longName.replace(/County/i, '').trim().replace(/ /g, '%20')
        });
        query = `${queryObj.query}=${queryObj.value}`;
        break;
      }
      case 'postal_code' : {
        Object.assign(queryObj, {
          query: 'zip',
          value: longName
        });
        query = `${queryObj.query}=${queryObj.value}`;
        break
      }
    }
    localStorage.setItem(`coords`, JSON.stringify(e.data.geometry.location));
    this.geoQueryString = query;
  }
}
