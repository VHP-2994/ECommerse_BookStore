import { Component, OnInit } from '@angular/core';
import { Book } from '../Book';
import { CartService } from '../cart.service';
import { Cart } from '../cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  books: Book[];
  cart : Cart[];
  subtotal: number;
  cartCount:number;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {

    this.cartService.findAll().subscribe(data => {
      console.log(data);
      this.cart = data;
      this.subtotal = this.cart[this.cart.length-1].sub_total;
      console.log(this.subtotal);
    })
  }


  receiveMessage($event){
    this.cartCount = $event;
    console.log(this.cartCount);
  }

  removeFromCart(id){
    this.cartService.deleteFromCart(id).subscribe(response => {
      console.log(id);
      this.cartService.findAll().subscribe(data => {
        this.cart = data;
        if(this.cart!==null){
        this.subtotal = this.cart[this.cart.length-1].sub_total;
      console.log(this.subtotal);
        }
      }),
      error => console.log(error);
    })
  }
}
