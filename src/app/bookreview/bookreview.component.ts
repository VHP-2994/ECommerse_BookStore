import { Component, OnInit, ViewChild } from '@angular/core';
import { Book } from '../Book';
import { Review } from '../Review';
import { BookService} from '../book.service';
import { ActivatedRoute, Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ReviewdialogComponent } from '../reviewdialog/reviewdialog.component';
import { AuthenticationService } from '../authentication.service';
import { User } from '../User';
import { Subscription, Subject } from 'rxjs';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-bookreview',
  templateUrl: './bookreview.component.html',
  styleUrls: ['./bookreview.component.css']
})
export class BookreviewComponent implements OnInit {
  book : Book;
  id: number;
  reviews : Review[];
  stars: number[] = [1, 2, 3, 4, 5];
  username: number;
userfirstname: String;
  currentUser: User;
  currentUserSubscription: Subscription;
  total:number;

  @ViewChild('selfClosingAlert', {static: false}) selfClosingAlert: NgbAlert;

  private _success = new Subject<string>();
  successMessage = '';

  private _wishsuccess = new Subject<string>();
  wishsuccess = '';

  userId:number;

  constructor(private route: ActivatedRoute,public loginService:AuthenticationService,private router: Router, private bookService: BookService,public dialog: MatDialog) {
    this.currentUserSubscription = this.loginService.currentUser.subscribe(user => {
      this.currentUser = user;
      console.log(this.currentUser);
      if(user!=null){
        this.userfirstname = user.firstName;
        this.userId = user.user_id;
      }
  });
   }

  ngOnInit(): void {
    this.book = new Book();

    this.id = this.route.snapshot.params['book_id'];
    console.log(this.id);
    
    this.bookService.findById(this.id)
      .subscribe(data => {
        console.log(data)
        this.book = data;
      }, error => console.log(error));

      this.bookService.getReview(this.id).subscribe(data =>{
        console.log(data)
      this.reviews = data;
      
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
    )
  }
  

  openDialog(): void {
    const dialogRef = this.dialog.open(ReviewdialogComponent, {
      width: '450px',
      data:{book_id:this.id,id: this.currentUser.user_id}
    });
  }
 

  getreviewComments(){
    this.bookService.getReview(this.id).subscribe(data =>{
      console.log(data);
    });
  }
  ngAfterContentChecked()  {
    
}


public changeSuccessMessage() { this._success.next(`Added to Cart`); }

public wishSuccessMessage() { this._wishsuccess.next(`Added to Wishlist`); }
 
}
