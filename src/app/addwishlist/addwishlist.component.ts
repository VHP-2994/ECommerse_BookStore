import { Component, OnInit } from '@angular/core';
import { Book } from '../Book';
import { BookService} from '../book.service';
import { Router } from '@angular/router';
import { WishlistService } from '../wishlist.service';

@Component({
  selector: 'app-addwishlist',
  templateUrl: './addwishlist.component.html',
  styleUrls: ['./addwishlist.component.css']
})
export class AddwishlistComponent implements OnInit {

  books: Book[] = [];
  book : Book;
  submitted = false;
  bookadded : String;
  constructor(private bookService: BookService,private router: Router,
    private wishlistService: WishlistService) { }

  ngOnInit(): void {
  }

  /*addtoWishList(id){
    this.bookadded = null;
    this.bookService.findById(id)
      .subscribe(data => {
        this.bookadded = "Book Added to wishlist Successfully";
        console.log("added book to wishlist");
        console.log(data);
        //this.books.push(data);
        this.wishlistService.postBook(id);
        console.log("added book to wishlist");
        this.gotoList();
      }, 
      error => console.log(error));
    //this.book = new Book();
   
    this.bookService.findAll();
  }*/

  addtoWishList(id){
     this.wishlistService.postBook(id).subscribe(data =>{
       console.log("wishlist book added");
       console.log(data);
       this.gotoList();
     })
  }

  gotoList() {
    this.router.navigate(['/wishlist']);
  }

}
