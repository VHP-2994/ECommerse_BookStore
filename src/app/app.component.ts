import { Component } from '@angular/core';
import { Book } from './Book';
import { BookService} from './book.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 
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

  postItem(){
    this.bookService.postBook(this.book).subscribe(data => 
      console.log(data));
      this.book = new Book();
      this.bookService.findAll().subscribe(data => {
        this.books = data;
      })
  }
  displayedColumns: String[] = ['book_id','book_title','book_author','book_price','actions','delete'];
}
