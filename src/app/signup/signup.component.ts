import { Component, OnInit } from '@angular/core';
import { BookService} from '../book.service';
import { User } from '../User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  user: User = new User();
  submitted = false;
  constructor(private bookService: BookService,private router: Router) { }

  ngOnInit(): void {
  }

  signupUser(){
this.bookService.postUser(this.user).subscribe(data=>{
  console.log(data);
        this.gotoList();
})
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.user);
    this.signupUser();    
  }

  gotoList() {
    this.router.navigate(['/login']);
  }

}
