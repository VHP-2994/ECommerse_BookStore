import { Component, OnInit , Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { BookreviewComponent } from '../bookreview/bookreview.component';
import { Book } from '../Book';
import { BookService} from '../book.service';
import { HttpClient, HttpHeaders ,HttpParams } from '@angular/common/http';
import { Review } from '../review';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../User';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-reviewdialog',
  templateUrl: './reviewdialog.component.html',
  styleUrls: ['./reviewdialog.component.css']
})
export class ReviewdialogComponent implements OnInit {

  stars: number[] = [1, 2, 3, 4, 5];
    selectedValue: number;
    review: Review;
    book_id: number;
    submitted = false;
    reviewer_name : String;
    currentUser: User;
    currentUserSubscription: Subscription;
    reviewuserid:number

  constructor(private route: ActivatedRoute,public dialogRef: MatDialogRef<BookreviewComponent>,
    private bookService: BookService,public loginService:AuthenticationService,private router: Router, private http: HttpClient, @Inject(MAT_DIALOG_DATA) public data: any
    ) { 
      this.currentUserSubscription = this.loginService.currentUser.subscribe(user => {
        this.currentUser = user;
        console.log(this.currentUser);
    });
  }

  ngOnInit(): void {
    this.review=new Review();
    
    console.log(this.data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  countStar(star) {
    this.selectedValue = star;
    console.log('Value of star', star);
    this.review.review_star = star;
  }

  saveReview() {
this.reviewuserid = this.currentUser.user_id;
console.log(this.reviewuserid);
    this.bookService.postReview(this.data.book_id,this.review,this.data.id)
      .subscribe(data => {
        console.log(data);
        //this.gotoList();
      });
      error => console.log(error);
    }

    onSubmit() {
      this.submitted = true;
      console.log(this.review);
      if(this.loginService.isUserLoggedIn){
        this.reviewer_name = sessionStorage.getItem("username");
      }
      this.saveReview();    
    }
  }
      
    //this.book = new Book();
   
    //this.gotoList();
  


