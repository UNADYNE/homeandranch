import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class SearchService {
  apiUrl: string = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getProperties(): Observable<any> {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    return this.http.get(`${this.apiUrl}scrape/hrr`, { headers: headers });
  }
}
