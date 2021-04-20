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
  itemAvailable:boolean=false;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {

    this.cartService.findAll().subscribe(data => {
      console.log(data);
      this.cart = data;
      if(this.cart.length!==0){
        this.itemAvailable = true;
        this.subtotal = this.cart[this.cart.length-1].sub_total;
        this.cartCount = this.cart.length;
      }
      console.log(this.cartCount);
      console.log(this.subtotal);
      console.log(this.itemAvailable);
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
        if(this.cart.length!==0){
          if(this.subtotal!==0){
        this.subtotal = this.cart[this.cart.length-1].sub_total;
      console.log(this.subtotal);
      this.cartCount = this.cart.length;
          }
        }
        if(this.cart.length===0){
          this.itemAvailable = false;
        }
      }),
      error => console.log(error);
    })
  }
}
