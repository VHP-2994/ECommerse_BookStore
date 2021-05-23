import { Component, OnInit } from '@angular/core';
import { Book } from '../Book';
import { BookService} from '../book.service';
import { Router } from '@angular/router';
import { WishlistService } from '../wishlist.service';
import { Subscription } from 'rxjs';
import { User } from '../User';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-addwishlist',
  templateUrl: './addwishlist.component.html',
  styleUrls: ['./addwishlist.component.css']
})
export class AddwishlistComponent implements OnInit {

  books: Book[] = [];
  book : Book;
  submitted = false;
  bookadded : String;
  count: number;
  
  badgeCount: number;

  currentUserSubscription: Subscription;
  userId:number;
  currentUser: User;

  public icon ='favorite_border';
  
  constructor(private bookService: BookService,private router: Router,
    private wishlistService: WishlistService,public loginService:AuthenticationService) { 
      this.badgeCount = 5;

      this.currentUserSubscription = this.loginService.currentUser.subscribe(user => {
        this.currentUser = user;
        if(user!=null){
          this.userId = user.user_id;
        }
    })
    }

  ngOnInit(): void {
  }

  /*addtoWishList(id){
    this.bookadded = null;
    this.bookService.findById(id)
      .subscribe(data => {
        this.bookadded = "Book Added to wishlist Successfully";
        console.log("added book to wishlist");
        console.log(data);
        //this.books.push(data);
        this.wishlistService.postBook(id);
        console.log("added book to wishlist");
        this.gotoList();
      }, 
      error => console.log(error));
    //this.book = new Book();
   
    this.bookService.findAll();
  }*/

  addtoWishList(id,b,userId){
    b.isSelected = true;
    console.log(b.isSelected);

    if(this.icon === 'favorite_border'){
      this.icon = 'favorite';
    }
    else{
      this.icon = 'favorite_border';
    }
     this.wishlistService.postBook(id,userId).subscribe(data =>{
       this.count = this.count+1;
       console.log("wishlist book added");
       console.log(data);
       //this.gotoList();
     })

     
  }

  
  incrementCount() {
    this.badgeCount= this.badgeCount++;
    console.log(this.badgeCount);
  }

  get returnIncrement(){
    return this.badgeCount;
  }

  gotoList() {
    this.router.navigate(['/wishlist']);
  }

}
