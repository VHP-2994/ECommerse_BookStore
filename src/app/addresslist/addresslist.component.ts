import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Checkout } from '../Checkout';
import { User } from '../User';
import { AuthenticationService } from '../authentication.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';
import { Book } from '../book';
import { Cart } from '../cart';

@Component({
  selector: 'app-addresslist',
  templateUrl: './addresslist.component.html',
  styleUrls: ['./addresslist.component.css']
})
export class AddresslistComponent implements OnInit {
  
  currentUser: User;
  options: FormGroup;
  userId:number;
  currentUserSubscription: Subscription;
  checkout: Checkout[];
  selectedAddress : Checkout;
  favoriteSeason:number = null;
  radioSelectedString: string;
  productString: string = null;
  constructor(private bookService: BookService,fb: FormBuilder,private router: Router, private route: ActivatedRoute,private http: HttpClient,public loginService:AuthenticationService) { 
    this.options = fb.group({ control: '' });
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
    console.log(this.userId);
    this.bookService.findCheckoutDetailsById(this.userId).subscribe(data =>{
      console.log(data);
      this.checkout = data;
      console.log(this.checkout);
    
    })
    this.route.queryParamMap.subscribe((params: any) => {
    this.productlist = JSON.parse(params.params.product)});
    console.log(this.productlist);
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
  }

   onClick(event) { 
      //just added console.log which will display the event details in browser on click of the button.
      console.log(event);
   }

  //    changeRoute(event:MatRadioChange){
  //    if(event.value !== null){
  //      this.router.navigate(['/payment']);
  //    }
  //    else{
  //      alert("please select address")
  //    }
  //  }

   changeRoute(){
    if(this.favoriteSeason !== null){
      console.log(this.favoriteSeason);
      this.router.navigate(['/addresslist/payment'],{ queryParams: { type:this.favoriteSeason },queryParamsHandling: 'merge'  });
    }
    else{
      alert("please select address")
    }
  }

  addnewAddressPreserveParam(){
    this.router.navigate(['/checkout'],{ queryParamsHandling: 'preserve'});
  }


}
