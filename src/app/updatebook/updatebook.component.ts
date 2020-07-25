import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/Book';
import { BookService} from 'src/app/book.service'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-updatebook',
  templateUrl: './updatebook.component.html',
  styleUrls: ['./updatebook.component.css']
})
export class UpdatebookComponent implements OnInit {
  book : Book;
 id: number;
  constructor(private route: ActivatedRoute,private router: Router, private bookService: BookService) { }

  ngOnInit(): void {
    this.book = new Book();

    this.id = this.route.snapshot.params['book_id'];
    console.log(this.id);
    
    this.bookService.findById(this.id)
      .subscribe(data => {
        console.log(data)
        this.book = data;
      }, error => console.log(error));
  }

   updateItem(){
    this.bookService.putBook(this.id,this.book)
    .subscribe(response => {
      console.log(this.book);
      this.book = new Book();
    })
  }

}
