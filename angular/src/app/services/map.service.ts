import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class MapService {
  constructor(private http: HttpClient) {}

  getLocation() {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    function success(pos) {}

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }
    navigator.geolocation.getCurrentPosition(success, error, options);
  }
}
