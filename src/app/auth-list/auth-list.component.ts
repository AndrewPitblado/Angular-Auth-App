import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { AuthorService } from '../author.service';
import { MessageService } from '../message.service';
import { Author } from '../author';
import { books } from '../books';
import{AfterViewInit, ViewChild} from '@angular/core'
import { Location } from '@angular/common';

import { ActivatedRoute } from '@angular/router';
import { elementAt, from } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogDeleteComponent } from '../dialog-delete/dialog-delete.component';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ViewEncapsulation } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';



@Component({
  selector: 'app-auth-list',
  templateUrl: './auth-list.component.html',
  styleUrls: ['./auth-list.component.css'],

  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  
})


export class AuthListComponent implements OnInit{
  public getJsonValue: any;
  dataSource:any;
  booksDataSource:any;
  bookButtonVisible = true;
  closeButtonVisible = false;
  //data: Author[] = [];
  columnsToDisplay: string[] = ['id','AuthorName','Contract','Phone',
  'Address','City','State','Zip', 'Action'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  columnsToDisplay2: string[] = ['Title', 'Type', 'Price', 'PubDate', 'Notes'];

  constructor(private authorService: AuthorService, 
    private messageService: MessageService,
    public dialog : MatDialog,
    public snackBar : MatSnackBar,
    private location : Location,
    private route : ActivatedRoute,
    
    ) {}

  authors : any;
  author:any;

  isTableExpanded = false;
  

  authorsBooks:any;

  @ViewChild(MatSort) sort !:MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator !: MatPaginator;

  @Output() authorsUpdated = new EventEmitter<Author>();
  

  selectedAuthor? : Author;
  
  ngOnInit(): void{
    
    
    this.getAuthors();

    this.dataSource.forEach((row: { id: string; })=>{
      this.getAuthorBooks(row.id)
    })
    

    
    
  }
  ngAfterViewInit(){
    
    
  }

  toggleTableRows(){
    this.isTableExpanded = !this.isTableExpanded;
    this.dataSource.data.forEach((row:any) => { 
      row.isExpanded = this.isTableExpanded;
      
      
    });
  }

  openDialog(){
    let dialogRef = this.dialog.open(DialogDeleteComponent);

    dialogRef.afterClosed().subscribe(result => {
      if( !!result){
        this.deleteAuthor(this.author);
      }
    })
  }

  applyFilter(event:Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    


    this.dataSource.data.forEach((row: { booksDataSource: { filter: string; }; }) => {
      row.booksDataSource.filter = filterValue;

    });
    
    if (this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }
  }



  horizontalPosition : MatSnackBarHorizontalPosition = 'center';
  verticalPosition : MatSnackBarVerticalPosition = 'bottom';

  showSnackbar(content: string, action: string | undefined, duration: any){
   this.snackBar.open(content, action, {
     duration: 2000,
     horizontalPosition : this.horizontalPosition,
     verticalPosition : this.verticalPosition,
   });
  }

  
  



  getAuthors(): void{
    this.authorService.getAuthors()
      .subscribe(response =>{
          {
          this.authors = response;
          //this.getJsonValue = this.authors;
          this.dataSource = new MatTableDataSource<Author[]>(this.authors);
          this.dataSource.sort = this.sort;
          
          this.dataSource.paginator = this.paginator;
          console.log(this.authors);
        }
      });
  }


  getAuthorBooks(id : string){
    //const name = this.route.snapshot.paramMap.get('au_fname') || '';

    return this.authorService.getBooks(id)
    .subscribe(response => {
      this.authorsBooks = response;
      this.getJsonValue = this.authorsBooks;
      this.booksDataSource = new MatTableDataSource<books[]>(this.authorsBooks);
      console.log(this.authorsBooks);
      
      
    })
  }

  deleteAuthor(author:Author){
    if(confirm('Are you sure you want to delete this Author?')){

    
    this.authorService.deleteAuthor(author)
    .subscribe((authors:Author[]) => this.authorsUpdated.emit(author));
    location.reload();
    
    
   }}

  


  

}

