import {Injectable} from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() {
  }

  validateRegister(user) {
    if (user.firstName == undefined || user.lastName == undefined || user.username == undefined || user.email == undefined || user.password == undefined) {
      console.warn('username validation error');
      return false;
    } else {
      return true;
    }
  }

  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  validateQuote(quote) {
    if (quote.quote == undefined) {
      return false;
    } else {
      return true
    }
  }

  validateUsernameSpaces(username){
    const re = /^[a-zA-Z0-9\-\_]*$/;
    return re.test(username)
  }

  validatePassword(password, confirmPassword){
    return password === confirmPassword;
  }

}
