import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { Book } from '../Book';
import { BookService} from '../book.service';
import { Observable, Subject, Subscription } from "rxjs";
import { AddtocartComponent } from '../addtocart/addtocart.component';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime } from 'rxjs/operators';
import { CartService } from '../cart.service';
import { DataService } from '../data.service';
import { AuthenticationService } from '../authentication.service';
import { User } from '../User';

@Component({
  selector: 'app-bookdetail',
  templateUrl: './bookdetail.component.html',
  styleUrls: ['./bookdetail.component.css']
})
export class BookdetailComponent implements OnInit {

  books: Book[];
  book : Book;
  bookswish: Book[];
  bookwish: Book;
  
  
  @ViewChild('selfClosingAlert', {static: false}) selfClosingAlert: NgbAlert;

  private _success = new Subject<string>();
  successMessage = '';

  private _wishsuccess = new Subject<string>();
  wishsuccess = '';

  currentUserSubscription: Subscription;
  userId:number;
  submitted = false; 
  currentUser: User;
  
  constructor(private bookService: BookService,
    private cartService: CartService,private dataService: DataService,public loginService:AuthenticationService) {
      this.currentUserSubscription = this.loginService.currentUser.subscribe(user => {
        this.currentUser = user;
        if(user!=null){
          this.userId = user.user_id;
        }
    })
  }

  
  ngOnInit() {
    this.bookService.findAll().subscribe(data => {
      console.log(data);
      this.books = data;
    })

    this._success.subscribe(message => this.successMessage = message);
    this._success.pipe(debounceTime(5000)).subscribe(() => {
      if (this.selfClosingAlert) {
        this.selfClosingAlert.close();
      }
    });

    this._wishsuccess.subscribe(message => this.wishsuccess = message);
    this._wishsuccess.pipe(debounceTime(5000)).subscribe(() => {
      if (this.selfClosingAlert) {
        this.selfClosingAlert.close();
      }
    });
  
  }

  private getBooks(){
    this.bookService.findAll().subscribe(data =>{
      console.log(data);
      this.books =data;
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

public changeSuccessMessage() { this._success.next(`Added to Cart`); }

public wishSuccessMessage() { this._wishsuccess.next(`Added to Wishlist`); }


  displayedColumns: String[] = ['book_id','book_title','book_author','book_price','actions','delete'];

}
