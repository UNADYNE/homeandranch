import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment.prod";

@Injectable({
  providedIn: "root"
})
export class MapService {
  apiUrl: string = environment.apiUrl;
  constructor(private http: HttpClient) {}

  headers: any = new HttpHeaders({ "Content-Type": "application/json" });

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

  getMapIcon() {
    return this.http.get(`${this.apiUrl}scrape/map-icon`, this.headers);
  }
}
