import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Book } from '../Book';
import { BookService} from '../book.service';
import { Observable } from "rxjs";
import { AddtocartComponent } from '../addtocart/addtocart.component';

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
  msg : string ="Hello";
  message : string ="hello child"

  @Output() messageEvent = new EventEmitter<string>();
   
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
  sendMessage(){
    this.messageEvent.emit(this.message);
    console.log(this.message);
  }
  displayedColumns: String[] = ['book_id','book_title','book_author','book_price','actions','delete'];

}
