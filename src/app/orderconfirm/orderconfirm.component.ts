import { Component, OnInit, Input } from '@angular/core';
import { AddresslistComponent } from '../addresslist/addresslist.component';
import { Checkout } from '../Checkout';
import { BookService } from '../book.service';
import { Cart } from '../cart';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../cart.service';
import { Subscription } from 'rxjs';
import { User } from '../User';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-orderconfirm',
  templateUrl: './orderconfirm.component.html',
  styleUrls: ['./orderconfirm.component.css']
})
export class OrderconfirmComponent implements OnInit {

 addressId: number;
 productlist: number[]=[];
 productArray: Cart[]=[];
 cart:Cart;
 addressID : number;
  checkout: Checkout;
  paymentMode: string = null;
  currentUserSubscription: Subscription;
  userId:number;
  submitted = false; 
  currentUser: User;
  cartArray: Cart[];
  subtotal: number;
  cartCount:number;
  constructor(private route: ActivatedRoute,private router: Router, private bookService: BookService,
    private cartService: CartService,public loginService:AuthenticationService) { 

      this.currentUserSubscription = this.loginService.currentUser.subscribe(user => {
        this.currentUser = user;
        if(user!=null){
          this.userId = user.user_id;
        }
    })
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params: any) => {
      this.productlist = JSON.parse(params.params.product);
      this.addressID = JSON.parse(params.params.type);
      this.paymentMode = params.params.mode;
    });
      console.log(this.productlist);
     console.log(this.addressID);
     console.log(this.paymentMode);
      //console.log(JSON.parse(params.params.product)));
        // for(let val of this.productlist){
        //   console.log(val);
        //   this.bookService.findCartItemByCartID(val)
        // .subscribe(data => {
        //   console.log(data)
        //   this.cart = data;
        //   this.productArray.push(this.cart);
        // }, error => console.log(error)); 
        // }
  
        // console.log(this.productArray);

        this.cartService.findAll(this.userId).subscribe(data =>{
          this.productArray = data;
          console.log(this.productArray);
        });


        this.bookService.findAddressById(this.addressID).subscribe(data =>{
          this.checkout = data;
          console.log(this.checkout);
         });

  }

}
