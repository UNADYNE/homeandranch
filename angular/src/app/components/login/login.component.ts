import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {JwtHelper} from 'angular2-jwt';


declare let $: any;
declare let Materialize: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;
  resetUsername: String;
  authToken: string;

  constructor(private authService: AuthService,
              private router: Router,
              private jwt: JwtHelper) {
  }

  ngOnInit() {
  }

  onLoginSubmit() {
    const user = {
      username: this.username,
      password: this.password
    };
    if (this.username === undefined || this.password === undefined) {
      console.error('onLoginSubmit() error!');
    } else {
      this.authService.authenticateUser(user).subscribe(data => {
        this.authService.storeUserData(data.token);
        this.authToken = this.authService.loadToken();
        this.authService.isAdmin() ? this.router.navigate(['/dashboard']) : this.router.navigate(['/']);
        location.reload();
      });
    }
  }

}
