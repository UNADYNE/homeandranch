import {AfterViewInit, Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {isNumber} from 'util';
import {JwtHelper} from 'angular2-jwt';

@Injectable()
export class AuthService implements OnInit, AfterViewInit {
  localhost: string = environment.apiUrl;

  authToken: any;
  user: any;
  httpOptions: any;
  sessionExpiration: number;
  subLevel: number;

  constructor(
    private http: HttpClient,
    private router: Router,
    private jwt: JwtHelper
  ) {
    this.httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    this.loadToken();
  }

  ngOnInit() {

  }

  ngAfterViewInit() {

  }

  registerUser(user): any {
    return this.http.post(
      `${this.localhost}users/register`,
      user,
      this.httpOptions
    );
  }

  authenticateUser(user): any {
    return this.http.post(
      `${this.localhost}users/authenticate`,
      user,
      this.httpOptions
    );
  }

  getProfile(user_id): any {
    return this.http.get(`${this.localhost}users/get-profile/${user_id}`);
  }

  // Get by state and category
  getMembersByCategory(query): any {
    return this.http.post(
      `${this.localhost}users/find-members-by-category`,
      query
    );
  }

  storeUserData(token) {
    localStorage.setItem('id_token', token);
    this.authToken = token;
  }

  loadToken(): string {
    this.authToken = localStorage.getItem('id_token');
    return this.authToken;
  }

  logOut() {
    this.authToken = null;
    this.user = null;
    localStorage.removeItem('id_token');
  }

  calcSessionTimeLeft(): number {
    console.log(`tokenDate: ${this.jwt.getTokenExpirationDate(this.loadToken()).getTime()}`);
    this.sessionExpiration = this.jwt.getTokenExpirationDate(this.loadToken()).getTime();
    return this.sessionExpiration - Math.floor(Date.now());
  }

  loggedIn(): boolean {
    if (localStorage.getItem('id_token') !== null && localStorage.getItem('id_token') !== 'undefined') {
      return localStorage.getItem('id_token').length > 20;
    }
  }

  isAdmin(): boolean {
    if (localStorage.getItem('id_token') !== null && localStorage.getItem('id_token') !== 'undefined') {
      const subLevel = this.jwt.decodeToken(localStorage.getItem('id_token'))
        .subLevel;
      this.subLevel = parseInt(subLevel, null);
      return this.subLevel > 1;
    }
  }
}
