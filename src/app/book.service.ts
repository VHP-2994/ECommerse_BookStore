import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Book } from './book';
import { Review } from './review';
import { User } from './User';
import { Checkout } from './Checkout';
import { Cart } from './cart';
import { Order } from './Order';


@Injectable({
  providedIn: 'root'
})
export class BookService {
  private bookUrl: string;
  constructor(private http: HttpClient) { 
    //this.bookUrl = 'http://localhost:8082/books';
  }

  public findAll(): Observable<Book[]> {
    console.log("test call");
    return this.http.get<Book[]>('http://localhost:8082/books');
    //return this.http.get<Book[]>(this.bookUrl);
  }

  public findById(book_id: number): Observable<Book>{
    return this.http.get<Book>(`http://localhost:8082/books/book/${book_id}`);
  }

  public findByUserId(id: number): Observable<User>{
    return this.http.get<User>(`http://localhost:8082/user/${id}`);
  }

  public updateuser(id: number,User:Object):Observable<User>{
    return this.http.put<User>(`http://localhost:8082/editaccount/${id}`, User);
  }

  public deleteBook(book_id: number): Observable<any>{
     return this.http.delete<any>(`http://localhost:8082/removeBook/${book_id}`);
  }

   public postBook(book: Book): Observable<Object>{
    return this.http.post(`http://localhost:8082/addbook`, book);
  }

  public putBook(book_id: number, Book: Object): Observable<Book>{
    return this.http.put<Book>(`http://localhost:8082/addbook/${book_id}`, Book);
  }

  public postReview(book_id: number, review: Review,id:number): Observable<Book>{
    return this.http.post<Book>(`http://localhost:8082/book/${book_id}/review/${id}`, review);
  } 
 
  public getReview(book_id: number): Observable<Review[]>{
    return this.http.get<Review[]>(`http://localhost:8082/book/${book_id}/review`);
  } 


  public postUser(user: User): Observable<Object>{
    return this.http.post(`http://localhost:8082/signup`,user);
  } 

  public postCheckoutDetails(checkout: Checkout,id: number): Observable<Object>{
    return this.http.post(`http://localhost:8082/saveaddress/${id}`,checkout);
  } 

  public findCheckoutDetailsById(id: number): Observable<Checkout[]>{
    return this.http.get<Checkout[]>(`http://localhost:8082/checkout/${id}`);
  }
 
  public findAddressById(id: number): Observable<Checkout>{
    return this.http.get<Checkout>(`http://localhost:8082/checkoutdetails/${id}`);
  }

  public findCartItemByCartID(id:number): Observable<Cart>{
    return this.http.get<Cart>(`http://localhost:8082/cartId/${id}`);
  }

  public findOrderByOrderId(id: number): Observable<Order>{
    return this.http.get<Order>(`http://localhost:8082/orderCancel/${id}`);
  }

  public updateOrderStatusByOrderId(id: number,order: Order): Observable<Order>{
    return this.http.put<Order>(`http://localhost:8082/canelOrder/${id}`,order)
  }
}
