import {
  Component,
  OnInit,
  ViewChild,
  ViewChildren,
  QueryList,
  AfterViewInit
} from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit, AfterViewInit {
  //query selectors
  @ViewChildren("slide")
  slide;
  @ViewChild("arrow-right")
  arrowRight;
  @ViewChild("arrow-left")
  arrowLeft;

  slideArray: any[];

  current: number = 0;
  animationTimer: number = 1100;

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.slideArray = this.slide.toArray();
    this.startSlide();
  }

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
}
