import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/Book';
import { BookService} from 'src/app/book.service'

@Component({
  selector: 'app-bookdetail',
  templateUrl: './bookdetail.component.html',
  styleUrls: ['./bookdetail.component.css']
})
export class BookdetailComponent implements OnInit {

  books : Book[];
  book: any;
  constructor(private bookService: BookService) {
  }
 
  ngOnInit() {
    this.bookService.findAll().subscribe(data => {
      this.books = data;
    });

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
