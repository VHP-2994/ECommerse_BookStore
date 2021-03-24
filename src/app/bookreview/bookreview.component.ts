import { Component, OnInit } from '@angular/core';
import { Book } from '../Book';
import { Review } from '../Review';
import { BookService} from '../book.service';
import { ActivatedRoute, Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ReviewdialogComponent } from '../reviewdialog/reviewdialog.component';
import { AuthenticationService } from '../authentication.service';
import { User } from '../User';
import { Subscription } from 'rxjs';

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

  constructor(private route: ActivatedRoute,public loginService:AuthenticationService,private router: Router, private bookService: BookService,public dialog: MatDialog) {
    this.currentUserSubscription = this.loginService.currentUser.subscribe(user => {
      this.currentUser = user;
      console.log(this.currentUser);
      if(user!=null){
        this.userfirstname = user.firstName;
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
      //total star rating
    //   this.total = this.reviews.reduce((runningValue: number, revi: Review) => 
    //   runningValue = runningValue + (revi.review_star)/2, 0);
    //   console.log(this.total);
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
 
}
