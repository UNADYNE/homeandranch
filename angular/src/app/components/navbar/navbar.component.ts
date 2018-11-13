import { Component, OnInit, AfterViewInit, ViewChild } from "@angular/core";

import {
  faBars,
  faChevronCircleLeft,
  faTimes
} from "@fortawesome/free-solid-svg-icons";

declare let $: any;

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit, AfterViewInit {
  faBars = faBars;
  faChevronCircleLeft = faChevronCircleLeft;
  faTimes = faTimes;

  @ViewChild("menuButton") menuButton: any;
  @ViewChild("sideMenu") sideMenu: any;
  @ViewChild("sideMenuCloseButton") sideMenuCloseButton: any;

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.sideMenu.nativeElement.style.display = "none";
    this.sideMenuCloseButton.nativeElement.style.display = "none";
  }

  openSideNav() {
    this.sideMenu.nativeElement.classList.add("side-menu-fade-in");
    this.sideMenu.nativeElement.style.display = "block";
    this.menuButton.nativeElement.style.display = "none";
    this.sideMenuCloseButton.nativeElement.style.display = "block";
  }

  closeSideNav() {
    this.sideMenu.nativeElement.classList.remove("side-menu-fade-in");
    this.sideMenu.nativeElement.classList.add("side-menu-fade-out");
    this.sideMenuCloseButton.nativeElement.style.display = "none";
    this.menuButton.nativeElement.style.display = "block";
    setTimeout(() => {
      this.sideMenu.nativeElement.classList.remove("side-menu-fade-out");
      this.sideMenu.nativeElement.classList.remove("side-menu-fade-in");
      this.sideMenu.nativeElement.style.display = "none";
    }, 450);
  }
}
