import { Component, OnInit, ViewChild } from '@angular/core';
import { books } from '../books';
import { AuthorService } from '../author.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit{
  booksDataSource : any;

  columnsToDisplay: string[] = ['ID', 'Title', 'Pub_Date', 'Price', 'Notes'];

  constructor(private authorService: AuthorService) {}


  books : any;


  @ViewChild(MatSort) sort !:MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator !: MatPaginator;


  ngOnInit(): void {

    

    this.getBooks();
    


  }
  
  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.booksDataSource.filter = filterValue.trim().toLocaleLowerCase();

    
  }

  getBooks(): void {
    this.authorService.getBooksList()
    .subscribe(response =>{
      this.books = response;
      this.booksDataSource = new MatTableDataSource<books[]>(this.books);
      this.booksDataSource.sort = this.sort;
      this.booksDataSource.paginator = this.paginator;
      console.log(this.books);
    });

  }



  
}
