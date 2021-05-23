import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { AuthenticationService } from '../authentication.service';
import { Subscription } from 'rxjs';
import { User } from '../User';
import { Order } from '../Order';

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.css']
})
export class MyordersComponent implements OnInit {

  currentUserSubscription: Subscription;
  userId:number;
  submitted = false; 
  currentUser: User;
  order : Order[] =[];

  constructor(private cartService: CartService,public loginService:AuthenticationService) {
    this.currentUserSubscription = this.loginService.currentUser.subscribe(user => {
      this.currentUser = user;
      if(user!=null){
        this.userId = user.user_id;
      }
  })
   }

  ngOnInit(): void {
    this.cartService.findOrderByUserId(this.userId).subscribe(data =>{
      this.order = data;
      console.log(this.order);
    })
    
  }

}
