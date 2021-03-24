import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Subscription } from 'rxjs';
import { User } from '../User';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  username: String;
userfirstname: String;
  currentUser: User;
  currentUserSubscription: Subscription;
  constructor(public loginService:AuthenticationService) { }

  ngOnInit() {
  }

}
