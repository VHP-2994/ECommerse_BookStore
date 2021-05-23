import { Component, OnInit } from '@angular/core';
import { Book } from '../Book';
import { BookService} from '../book.service';
import { WishlistService } from '../wishlist.service';
import { Wishlist } from '../wishlist';
import { Subscription } from 'rxjs';
import { User } from '../User';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  books: Book[];
  wishlist : Wishlist[];
  wishcount : number;
  wishlistItemAvilable:boolean = false;

  currentUserSubscription: Subscription;
  userId:number;
  currentUser: User;

  constructor(private wishlistService: WishlistService,public loginService:AuthenticationService) {
    this.currentUserSubscription = this.loginService.currentUser.subscribe(user => {
      this.currentUser = user;
      if(user!=null){
        this.userId = user.user_id;
      }
  })
   }

  ngOnInit(): void {

    this.wishlistService.findAll(this.userId).subscribe(data => {
      console.log(data);
      this.wishlist = data;
      if(this.wishlist.length!==0){
        this.wishlistItemAvilable = true;
      }
      this.wishcount =this.wishlist.length;
      console.log(this.wishcount)
      console.log(this.wishlistItemAvilable);
    })
  
  }

  removeWishbook(id){
    this.wishlistService.deleteWishlist(id).subscribe(response => {
      console.log(id);
      this.wishlistService.findAll(this.userId).subscribe(data => {
        this.wishlist = data;
        if(this.wishlist.length===0){
          this.wishlistItemAvilable=false;
        }
      }),
      error => console.log(error);
    })
  }

}
