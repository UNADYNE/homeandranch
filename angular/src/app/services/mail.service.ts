import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class MailService {

  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  storeContact(data) {
    const headers = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    console.log(headers);
    return this.http.post(`${this.apiUrl}contacts/store-contact`, data, headers);
  }

}
