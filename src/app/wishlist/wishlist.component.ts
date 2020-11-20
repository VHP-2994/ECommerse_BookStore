import { Component, OnInit } from '@angular/core';
import { Book } from '../Book';
import { BookService} from '../book.service';
import { WishlistService } from '../wishlist.service';
import { Wishlist } from '../wishlist';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  books: Book[];
  wishlist : Wishlist[];

  constructor(private wishlistService: WishlistService) { }

  ngOnInit(): void {

    this.wishlistService.findAll().subscribe(data => {
      console.log(data);
      this.wishlist = data;
    })
  
  }

  removeWishbook(id){
    this.wishlistService.deleteWishlist(id).subscribe(response => {
      console.log(id);
      this.wishlistService.findAll().subscribe(data => {
        this.wishlist = data;
      }),
      error => console.log(error);
    })
  }

}
