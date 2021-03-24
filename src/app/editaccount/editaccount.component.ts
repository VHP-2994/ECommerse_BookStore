import { Component, OnInit } from '@angular/core';
import { User } from '../User';
import { BookService} from '../book.service'
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../authentication.service';
@Component({
  selector: 'app-editaccount',
  templateUrl: './editaccount.component.html',
  styleUrls: ['./editaccount.component.css']
})
export class EditaccountComponent implements OnInit {

  user : User;
 id: number;
  constructor(public loginService:AuthenticationService,private route: ActivatedRoute,private router: Router, private bookService: BookService) { }

  ngOnInit(): void {
    this.user = new User();

    this.id = this.route.snapshot.params['user_id'];
    console.log(this.id);
    
    this.bookService.findByUserId(this.id)
      .subscribe(data => {
        console.log(data)
        this.user = data;
      }, error => console.log(error));
  }
  currentUser: User;
  currentUserSubscription: Subscription;
  updateUser(){
    this.bookService.putBook(this.id,this.user)
    .subscribe(response => {
      console.log(this.user);
     // this.book = new Book();
      
      sessionStorage.setItem('currentUser', JSON.stringify(this.user));
      this.currentUserSubscription = this.loginService.currentUser.subscribe(user => {
        this.currentUser = user;
        console.log(user);
        this.gotoList();
    })
  }, error => console.log(error));
}

  gotoList() {
    this.router.navigate(['/account']);
  }

}
