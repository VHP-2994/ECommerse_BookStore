import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Checkout } from '../Checkout';
import { BookService } from '../book.service';
import { Cart } from '../cart';
import { timer, combineLatest, Observable, Subscription } from 'rxjs';
import { CartService } from '../cart.service';
import { User } from '../User';
import { AuthenticationService } from '../authentication.service';
import { Order } from '../Order';

@Component({
  selector: 'app-paymentdetails',
  templateUrl: './paymentdetails.component.html',
  styleUrls: ['./paymentdetails.component.css']
})
export class PaymentdetailsComponent implements OnInit {

  addressID : number;
  checkout: Checkout;
  paymentoption: string = null;
  currentUserSubscription: Subscription;
  userId:number;
  submitted = false; 
  currentUser: User;
  constructor(private route: ActivatedRoute,private router: Router,
     private bookService: BookService,private cartService: CartService,public loginService:AuthenticationService) {
    this.currentUserSubscription = this.loginService.currentUser.subscribe(user => {
      this.currentUser = user;
      if(user!=null){
        this.userId = user.user_id;
      }
  })
   }
   productlist: number[]=[];
   productArray: Cart[]=[];
   cart:Cart;
  ngOnInit(): void {

    // this.addressID = this.route.snapshot.params['id'];
    // console.log(this.addressID);

     this.route.queryParamMap.subscribe((params: any) => {
      this.productlist = JSON.parse(params.params.product);
      this.addressID = JSON.parse(params.params.type);
    });
      console.log(this.productlist);
     console.log(this.addressID);
      //console.log(JSON.parse(params.params.product)));
        for(let val of this.productlist){
          console.log(val);
          this.bookService.findCartItemByCartID(val)
        .subscribe(data => {
          console.log(data)
          this.cart = data;
          this.productArray.push(this.cart);
        }, error => console.log(error)); 
        }
  
        console.log(this.productArray);

        this.bookService.findAddressById(this.addressID).subscribe(data =>{
          this.checkout = data;
          console.log(this.checkout);
         });
    }

    
  backtoAddress(){
    this.router.navigate(['/addresslist'], { queryParamsHandling: 'preserve' })
  }
order: any;
  moveToOrder(){
    if(this.paymentoption !== null){
      console.log(this.paymentoption);
      console.log(typeof(this.paymentoption));
      this.cartService.postOrder(this.userId).subscribe(data =>{
      this.order = data;
      console.log(this.order);

      })
      this.router.navigate(['/addresslist/payment/order'],{ queryParams: { mode :'Pay On Delivery' },queryParamsHandling: 'merge'  });
    }
    else{
      alert("please select address")
    }
  }
}
