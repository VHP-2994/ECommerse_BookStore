import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Cart } from './cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  public postBook(bookid: Number): Observable<Object>{
    return this.http.post(`http://localhost:8082/addToCart/${bookid}`,null);
  }

  public findAll(): Observable<Cart[]> {
    console.log("test call");
    return this.http.get<Cart[]>('http://localhost:8082/cart');
    //return this.http.get<Book[]>(this.bookUrl);
  }

  public deleteFromCart(cartid: Number): Observable<any>{
    return this.http.delete<any>(`http://localhost:8082/removeFromCart/${cartid}`);
  }
}
