import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { BehaviorSubject, Observable } from 'rxjs';
import {User } from './User';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;



  constructor(private httpClient: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
   }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
}

  authenticate(username, password) {
    return this.httpClient
      .post<any>("http://localhost:8082/authenticate", { username, password })
      .pipe(
        map(user => {
         // sessionStorage.setItem("username", username);
          //console.log("username :"+username);
          //let tokenStr = "Bearer " + user.token;
         // console.log("Token :"+tokenStr);
         // sessionStorage.setItem("token", tokenStr);
         if (user && user.token) {
          sessionStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
          sessionStorage.setItem("username", username);
         }
          return user;
        })
      );
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem("username");
   // console.log(!(user === null));
    return !(user === null);
  }

  logOut() {
    sessionStorage.removeItem("username");
    this.currentUserSubject.next(null);
  }

}
