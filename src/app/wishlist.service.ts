import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Book } from './book';
import { Wishlist } from './wishlist';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private http: HttpClient) { }

  public postBook(bookid: Number): Observable<Object>{
    return this.http.post(`http://localhost:8082/addToWishlist/${bookid}`,null);
  }

  public findAll(): Observable<Wishlist[]> {
    console.log("test call");
    return this.http.get<Wishlist[]>('http://localhost:8082/wishlist');
    //return this.http.get<Book[]>(this.bookUrl);
  }

  public deleteWishlist(wishid: Number): Observable<any>{
    return this.http.delete<any>(`http://localhost:8082/removeWishlist/${wishid}`);
  }
}
