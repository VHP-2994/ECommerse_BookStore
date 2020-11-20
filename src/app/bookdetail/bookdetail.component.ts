import { Component, OnInit } from '@angular/core';
import { Book } from '../Book';
import { BookService} from '../book.service';
import { Observable } from "rxjs";

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
   
  constructor(
    private bookService: BookService
  ) { }

  
  ngOnInit() {
    this.bookService.findAll().subscribe(data => {
      console.log(data);
      this.books = data;
    })
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

  displayedColumns: String[] = ['book_id','book_title','book_author','book_price','actions','delete'];

}
