import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../User';
import { CartService } from '../cart.service';
import { AuthenticationService } from '../authentication.service';
import { Order } from '../Order';
import { Cart } from '../cart';

@Component({
  selector: 'app-manageorder',
  templateUrl: './manageorder.component.html',
  styleUrls: ['./manageorder.component.css']
})
export class ManageorderComponent implements OnInit {

  currentUserSubscription: Subscription;
  userId:number;
  submitted = false; 
  currentUser: User;
  order : Order[] =[];

  
  cartArray: Cart[];
  subtotal: number;
  cartCount:number;
  
  orderItemAvilable:boolean = false;

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
      if(this.order.length!==0){
        this.orderItemAvilable = true;
      }
      
      console.log(this.orderItemAvilable);
    })
    
  }

}
