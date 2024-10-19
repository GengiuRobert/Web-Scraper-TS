import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private apiUrl = 'http://localhost:4000/books';

  constructor(private http: HttpClient) { }

  scrapeBooks(): Observable<any> {
    return this.http.get(`${this.apiUrl}/scrape`);
  }

  populateDatabaseFromJSON(): Observable<any> {
    return this.http.post(`${this.apiUrl}/populate`, {});
  }

  readBooks(): Observable<any> {
    const books = this.http.get(`${this.apiUrl}`);
    return books;
  }

  deleteBook(bookId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${bookId}`);
  }

  updateBook(bookId: string, updatedBook: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${bookId}`, updatedBook);
  }

}
