import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CartService } from '../cart.service';
import { Router } from '@angular/router';
import { BookService} from '../book.service';
import { Cart } from '../cart';
import { Subscription } from 'rxjs';
import { DataService } from '../data.service';
import { AuthenticationService } from '../authentication.service';
import { User } from '../User';

@Component({
  selector: 'app-addtocart',
  templateUrl: './addtocart.component.html',
  styleUrls: ['./addtocart.component.css']
})
export class AddtocartComponent implements OnInit {

  currentUserSubscription: Subscription;
  userId:number;
  submitted = false; 
  currentUser: User;
  constructor(private bookService: BookService,private router: Router,
    private cartService: CartService,private dataService: DataService,public loginService:AuthenticationService) {
      this.currentUserSubscription = this.loginService.currentUser.subscribe(user => {
        this.currentUser = user;
        if(user!=null){
          this.userId = user.user_id;
        }
    })
     }

    books: Cart[] = [];
  book : Cart;
  bookadded = false;
  count:number;
  cart_addedmsg:String;
  badgeCount: number=0;
  public subscription: Subscription;
  public messageForSibling: number;
  data : number;

  @Output() messageEvent = new EventEmitter<number>();


  ngOnInit(): void {
  }

  addToCart(id,b,userId){
    b.isSelected = true;
    console.log(b.isSelected);

     this.cartService.postBook(id,this.userId).subscribe(data =>{
      this.bookadded = true;
       console.log("wishlist book added");
       console.log(data);
       //this.gotoList();
       this.badgeCount++;
       console.log(this.badgeCount);
       this.cart_addedmsg ="Book Added to cart";
     })
console.log(this.badgeCount);
     return this.badgeCount;
  }

  getBadgeCount(){
    if(this.bookadded){
      this.badgeCount++;
    }
    console.log(this.badgeCount);
    return this.badgeCount;
  }

  sendMessage(){
    this.messageEvent.emit(this.badgeCount)
  }

  Bookaddedmsg(){
    return this.cart_addedmsg;
  }

  isBookAdded(){
    if(this.bookadded){
          this.count=this.count+1;
    }
  }
}
