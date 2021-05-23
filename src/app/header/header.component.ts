import { Component,ViewChild,Input } from '@angular/core';
import { Book } from '../Book';
import { User } from '../User';
import { BookService} from '../book.service';
import {MatSidenav} from '@angular/material/sidenav';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../authentication.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { Wishlist } from '../wishlist';
import { WishlistService } from '../wishlist.service';
import { AddwishlistComponent } from '../addwishlist/addwishlist.component';
import { DataService } from '../data.service';
import { CartService } from '../cart.service';
import { Cart } from '../cart';
import { AddtocartComponent } from '../addtocart/addtocart.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  books : Book[];
  book: any;
  username: String;
userfirstname: String;
  currentUser: User;
  currentUserSubscription: Subscription;
  panelOpenState = false;
  wishlist : Wishlist[];
  wishlistcount:number;
  cartArray:Cart[];
  count: number;
  message:string;
  bookswish: Book[];
  bookwish: Book;
  msg : string ="Hello";
  userId: number;
 badgeCount:number;
  constructor(private bookService: BookService,public loginService:AuthenticationService
    ,public dialog: MatDialog,private dataService: DataService,public cartService: CartService) {

    this.currentUserSubscription = this.loginService.currentUser.subscribe(user => {
      this.currentUser = user;
      if(user!=null){
        this.userfirstname = user.firstName;
        this.userId = user.user_id;
      }
      else{
        this.userfirstname = 'SignIn'
      }
  })
  
  }
 
  ngOnInit() {
    this.bookService.findAll().subscribe(data => {
      this.books = data;
      console.log(this.books);
    });
    this.cartService.findAll(this.userId).subscribe(data => {
      console.log(data);
      this.cartArray = data;
      console.log(this.cartArray);
    })
  }

 
  deleteItem(id){
    this.bookService.deleteBook(id)
    .subscribe(response => {
      console.log(id);
      this.bookService.findAll().subscribe(data => {
        this.books = data;
      }),
      error => console.log(error);
    })

  }


  // get count() {
  //   return this.cartArray ? this.cartArray.length : 0;
  // }
  // set count(value) {
  //   this.cartArray.length = value;
  // }

  postItem(){
    this.bookService.postBook(this.book).subscribe(data => 
      console.log(data));
      this.book = new Book();
      this.bookService.findAll().subscribe(data => {
        this.books = data;
      })
  }

  receiveMessage($event){
    this.message = $event
    console.log(this.message);
  }
  private getBooks(){
    this.bookService.findAll().subscribe(data =>{
      console.log(data);
      this.books =data;
    })
  }
  
  
  displayedColumns: String[] = ['book_id','book_title','book_author','book_price','actions','delete'];

}
