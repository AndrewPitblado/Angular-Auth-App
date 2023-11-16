import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError,map, tap, retry } from 'rxjs';

import { books } from './books';
import { Author } from './author';
//import { AUTHORS } from './mock-authors';
import { MessageService } from './message.service';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  private url = "author";
  apiURL = 'https://localhost:7209/author'
  bookApiURL = 'https://localhost:7209/books'

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json-patch+json'})

  };

  

  constructor(
    private messageService: MessageService,
    private http: HttpClient
    ) { }


  getAuthors(): Observable<Author[]> {
    
    
    return this.http.get<Author[]>(this.apiURL);
  }

  getBooks(id:string): Observable<books[]>{
    const bookURL = `${this.bookApiURL}/${id}`;
    return this.http.get<books[]>(
      bookURL
    );
  }

  getBooksList(): Observable<books[]>{
    return this.http.get<books[]>(this.bookApiURL);
  }






  getAuthor(id:string): Observable<Author> {
    const authorurl = `${this.apiURL}/${id}`;

   
    
     return this.http.get<Author>(
      authorurl
      );
     //.pipe(


    //  // map(authors => authors[0]),
    //  // tap(h => {
    //     const outcome = h ? 'fetched' : 'did not find';
    //     this.log(`${outcome} author id=${id}`);
    //  // }),
    //   catchError(this.handleError<Author>(`getAuthor id=${id}`))
    //  );
  }

  updateAuthor(author: Author): Observable<Author[]>{
    return this.http.put<Author[]>(
      `${this.apiURL}/${author.id}`,
      author
    );
  }

  createAuthor(author: Author): Observable<Author[]>{
    return this.http.post<Author[]>(
      this.apiURL, author
      
    );
  }

  deleteAuthor(author: Author): Observable<Author[]>{
    return this.http.delete<Author[]>(
      `${this.apiURL}/${author.id}`
    )
  }

  private log(message:string) {
    this.messageService.add(`AuthorService: ${message}`);
  }

  /**
   * @param operation - name of operation that failed
    @param result - optional value to return as the observable result
   * 
   */


    private handleError<T>(operation = 'operation', result?:T){
      return (error: any): Observable<T> => {
        console.error(error);
        this.log(`${operation} failed: ${error.message}` );
        return of (result as T);
      };
    }
  
}
