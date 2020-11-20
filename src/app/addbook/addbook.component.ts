import { Component, OnInit } from '@angular/core';
import { Book } from '../Book';
import { BookService} from '../book.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.css']
})
export class AddbookComponent implements OnInit {
  book: Book = new Book();
  submitted = false;
  bookadded : String;
  constructor(private bookService: BookService,private router: Router) { }

  ngOnInit() {
  }

  save() {
    this.bookadded = null;
    this.bookService.postBook(this.book)
      .subscribe(data => {
        this.bookadded = "Book Added Successfully";
        console.log(data);
        this.gotoList();
      }, 
      error => console.log(error));
    //this.book = new Book();
    this.bookService.findAll();
    //this.gotoList();
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.book);
    this.save();    
  }

  gotoList() {
    this.router.navigate(['/bookDetails']);
  }
}
