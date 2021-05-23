import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Cart } from './cart';
import { Order } from './Order';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  public postBook(bookid: Number, id: Number): Observable<Object>{
    return this.http.post(`http://localhost:8082/addToCart/${bookid}/${id}`,null);
  }

  public findAll(id: Number): Observable<Cart[]> {
    console.log("test call");
    return this.http.get<Cart[]>(`http://localhost:8082/cart/${id}`);
    //return this.http.get<Book[]>(this.bookUrl);
  }

  public deleteFromCart(cartid: Number): Observable<any>{
    return this.http.delete<any>(`http://localhost:8082/removeFromCart/${cartid}`);
  }

  public postOrder(id: Number): Observable<Order[]>{
    return this.http.post<Order[]>(`http://localhost:8082/saveOrder/${id}`,null);
  }

  public findOrderByUserId(id: Number): Observable<Order[]> {
    console.log("test call");
    return this.http.get<Order[]>(`http://localhost:8082/order/${id}`);
    //return this.http.get<Book[]>(this.bookUrl);
  }
}
