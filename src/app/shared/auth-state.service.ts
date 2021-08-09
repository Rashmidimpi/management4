import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class AuthStateService {
  [x: string]: any;

  private userState = new BehaviorSubject<boolean>(this.isLoggedIn());
  userAuthState = this.userState.asObservable();

  constructor() { }

  setAuthState(value: boolean){
    this.userState.next(value);
  }

  isLoggedIn(){
    if(localStorage.getItem("isLoggedin") == "true"){
      return true;
    }
    return false;
  }
}
