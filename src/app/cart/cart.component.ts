import { Component, OnInit } from '@angular/core';
import { Book } from '../Book';
import { CartService } from '../cart.service';
import { Cart } from '../cart';
import { NavigationExtras, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../User';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  books: Book[];
  cart : Cart[];
  subtotal: number;
  cartCount:number;
  itemAvailable:boolean=false;


  currentUserSubscription: Subscription;
  userId:number;
  submitted = false; 
  currentUser: User;

  constructor(private cartService: CartService,private router: Router,public loginService:AuthenticationService) { 
    this.currentUserSubscription = this.loginService.currentUser.subscribe(user => {
      this.currentUser = user;
      if(user!=null){
        this.userId = user.user_id;
      }
  })
  }

  ngOnInit(): void {

    this.cartService.findAll(this.userId).subscribe(data => {
      console.log(data);
      this.cart = data;
      if(this.cart.length!==0){
        this.itemAvailable = true;
        this.subtotal = this.cart[this.cart.length-1].sub_total;
        this.cartCount = this.cart.length;
      }
      console.log(this.cartCount);
      console.log(this.subtotal);
      console.log(this.itemAvailable);
    })
  }

  cartnum : number[] = [];

  onClickProceed(){
    let navigationExtras: NavigationExtras = {
      queryParams: this.cart
  };

 for(let val of this.cart){
   this.cartnum.push(val.cart_id);
 }
 console.log(this.cartnum);
  this.router.navigate(["addresslist"], { queryParams: { product: JSON.stringify(this.cartnum) }} );
  }

  receiveMessage($event){
    this.cartCount = $event;
    console.log(this.cartCount);
  }

  removeFromCart(id){
    this.cartService.deleteFromCart(id).subscribe(response => {
      console.log(id);
      this.cartService.findAll(this.userId).subscribe(data => {
        this.cart = data;
        if(this.cart.length!==0){
          if(this.subtotal!==0){
        this.subtotal = this.cart[this.cart.length-1].sub_total;
      console.log(this.subtotal);
      this.cartCount = this.cart.length;
          }
        }
        if(this.cart.length===0){
          this.itemAvailable = false;
        }
      }),
      error => console.log(error);
    })
  }
}
