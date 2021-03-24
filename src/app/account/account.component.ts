import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { BookService} from '../book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../User';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  
  username: String;
userfirstname: String;
userLastname: String;
email :String;
userid :number;
  currentUser: User;
  currentUserSubscription: Subscription;
  panelOpenState = false;
  constructor(public loginService:AuthenticationService,private bookService: BookService) { 
   
  }

  ngOnInit(): void {
     
      this.currentUser = this.loginService.currentUserValue;
      console.log(this.currentUser);
      if(this.currentUser!=null){
        this.userid = this.currentUser.user_id;
        this.userfirstname = this.currentUser.firstName;
        this.userLastname = this.currentUser.lastName;
        this.email = this.currentUser.username;
      }
  }
}
