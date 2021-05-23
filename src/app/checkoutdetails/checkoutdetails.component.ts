import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Checkout } from '../Checkout';
import { User } from '../User';
import { AuthenticationService } from '../authentication.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-checkoutdetails',
  templateUrl: './checkoutdetails.component.html',
  styleUrls: ['./checkoutdetails.component.css']
})
export class CheckoutdetailsComponent implements OnInit {

  checkout: Checkout = new Checkout();
  currentUser: User;
  
  currentUserSubscription: Subscription;
  userId:number;
  submitted = false;

  constructor(private bookService: BookService,private router: Router, private http: HttpClient,public loginService:AuthenticationService) { 
    this.currentUserSubscription = this.loginService.currentUser.subscribe(user => {
      this.currentUser = user;
      if(user!=null){
        this.userId = user.user_id;
      }
  })
  }

  ngOnInit(): void {
  }

  save(){
    this.bookService.postCheckoutDetails(this.checkout,this.userId)
    .subscribe(data => {
      console.log(data);
      this.router.navigate(['/addresslist'], { queryParamsHandling: 'preserve' })    
    });
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.checkout);
    this.save();
    
  }


  backtoAddress(){
    this.router.navigate(['/addresslist'], { queryParamsHandling: 'preserve' })
  }
  
}
