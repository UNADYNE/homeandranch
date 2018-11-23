import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {SearchService} from '../../services/search.service';
import {UserService} from '../../services/user.service';

declare let $: any;


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, AfterViewInit {

  @ViewChild('stateSelector') stateSelector: any;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  isAdmin: boolean;
  subLevel: number = 0;


  constructor(private validateService: ValidateService,
              private authService: AuthService,
              private router: Router,
              private searchService: SearchService,
              private userService: UserService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // this.getAllStates();
  }

  onRegisterSubmit() {
    console.log('onRegisterSubmit clicked');
    const user = {
      firstName: this.firstName,
      lastName: this.lastName,
      username: this.username,
      email: this.email,
      phone: this.phone,
      password: this.password,
      confirmPassword: this.confirmPassword,
      subLevel: this.subLevel,
      isAdmin: this.isAdmin
    };
    console.log(user);


    if (!this.validateService.validateRegister(user)) {
      console.warn('user validation failure');
      return false;
    }

    if (!this.validateService.validateUsernameSpaces(user.username)) {
      console.warn('username validation error');
      console.warn('username spaces validation failure');

      return false;
    }

    if (!this.validateService.validateEmail(user.email)) {
      console.warn('email validation failure');
      return false;
    }

    if (!this.validateService.validatePassword(this.password, this.confirmPassword)) {
      console.warn('password validation failure');
      return false;
    }


    //register user
    this.authService.registerUser(user).subscribe(results => {
      if (results.success === true) {
        console.log(results.user._id);
        localStorage.setItem('uploadMember_id', results.user._id);
        // this.router.navigate(['/login']);

      } else if (results.success === false) {
        console.warn('Registration Failed', results);
      }
    });
  }



  setSubLevel() {
    this.isAdmin ? this.subLevel = 3 : this.subLevel = 0;
    console.log('subLevel: ', this.subLevel);
  }


}
