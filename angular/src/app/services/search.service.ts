import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  apiUrl: string = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getProperties(data): Observable<any> {
    return this.http.get(`${this.apiUrl}search/properties-with-filters${data}`);
  }

  getAllProperties() {
    return this.http.get(`${this.apiUrl}search/all-properties`)
  }

  getMedia(listno): any {
    return this.http.get(`${this.apiUrl}scrape/get-media?listno=${listno}`);
  }


  getAllContacts(): any {
    return this.http.get(`${this.apiUrl}contacts/get-all-contacts`);
  }

  downloadProperties(): any {
    return this.http.get(`${this.apiUrl}scrape/rets-client`);
  }

  deleteAllProperties(): any {
    const headers = new HttpHeaders({'Content-Type' : 'application/json'});
    return this.http.post(`${this.apiUrl}scrape/delete-all-properties`, headers);
  }
}
