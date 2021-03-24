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
  count: number;
  
  badgeCount: number;

  public icon ='favorite_border';
  
  constructor(private bookService: BookService,private router: Router,
    private wishlistService: WishlistService) { 
      this.badgeCount = 5;
    }

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

  addtoWishList(id,b){
    b.isSelected = true;
    console.log(b.isSelected);

    if(this.icon === 'favorite_border'){
      this.icon = 'favorite';
    }
    else{
      this.icon = 'favorite_border';
    }
     this.wishlistService.postBook(id).subscribe(data =>{
       this.count = this.count+1;
       console.log("wishlist book added");
       console.log(data);
       //this.gotoList();
     })

     
  }

  
  incrementCount() {
    this.badgeCount= this.badgeCount++;
    console.log(this.badgeCount);
  }

  get returnIncrement(){
    return this.badgeCount;
  }

  gotoList() {
    this.router.navigate(['/wishlist']);
  }

}
