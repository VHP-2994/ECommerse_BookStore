import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Book } from './book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private bookUrl: string;
  constructor(private http: HttpClient) { 
    this.bookUrl = 'http://localhost:8082/books';
  }

  public findAll(): Observable<Book[]> {
    return this.http.get<Book[]>(this.bookUrl);
  }

  public findById(book_id: number): Observable<Book>{
    return this.http.get<Book>(`http://localhost:8082/book/${book_id}`);
  }

  public deleteBook(book_id: number): Observable<any>{
     return this.http.delete<any>(`http://localhost:8082/removeBook/${book_id}`);
  }

  public postBook(Book: Object): Observable<Book>{
    return this.http.post<Book>(`http://localhost:8082/book`, Book);
  }

  public putBook(book_id: number, Book: Object): Observable<Book>{
    return this.http.put<Book>(`http://localhost:8082/book/${book_id}`, Book);
  }
 
}
