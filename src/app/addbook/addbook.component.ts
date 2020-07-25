import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/Book';
import { BookService} from 'src/app/book.service'

@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.css']
})
export class AddbookComponent implements OnInit {
  book: Book = new Book();
  constructor(private bookService: BookService) { }

  ngOnInit(): void {
  }

  
  postBook(){
   this.bookService.postBook(this.book).subscribe(data => {
     console.log("Book created Successfully");
   },
   error => console.log(error))
  }
}
