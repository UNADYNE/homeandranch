import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { MapService } from "../../services/map.service";
// import * as data from "../../../assets/data.json";
import { SearchService } from "src/app/services/search.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.css"]
})
export class MapComponent implements OnInit, AfterViewInit {

  lat: number;
  long: number;
  pos: any;
  iconUrl: string = `http://localhost:8080/assets/images/icon_house.png`;
  listings: any[];

  constructor(
    private mapService: MapService,
    private searchService: SearchService
  ) {}

  ngOnInit() {

  }

  ngAfterViewInit() {}

  // getLocation() {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(pos => {
  //       this.lat = pos.coords.latitude;
  //       this.long = pos.coords.longitude;
  //     });
  //   }
  // }

  // outputData() {
  //   const tempArray = [];
  //   for (let i = 0; i < data.results.length; i++) {
  //     data.results[i].bathrooms = data.results[i].bathrooms.split(".")[0];
  //     tempArray.push(data.results[i]);
  //   }
  //   this.listings = tempArray;
  //   // console.log(`tempArray: ${this.listings.length}`);
  // }

  // getMapIcon() {
  //   this.mapService.getMapIcon().subscribe(icon => {
  //     console.log(icon);
  //   });
  // }
  //
  // outputData() {
  //   this.searchService.getProperties().subscribe(res => {
  //     const tempArray = [];
  //     if (res.response == 200) {
  //       for (let i = 0; i < res.data.results.length; i++) {
  //         res.data.results[i].bathrooms = res.data.results[i].bathrooms.split(
  //           "."
  //         )[0];
  //         tempArray.push(res.data.results[i]);
  //       }
  //       this.listings = tempArray;
  //     }
      // this.getMapIcon();
      // console.log(this.listings);
  //   });
  // }
}
