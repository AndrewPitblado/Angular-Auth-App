import { Component, EventEmitter,Input, Output, OnInit } from '@angular/core';
import { Author } from '../author';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AuthorService } from '../author.service';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormField } from '@angular/material/form-field';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarModule, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
@Component({
  selector: 'app-auth-detail',
  templateUrl: './auth-detail.component.html',
  styleUrls: ['./auth-detail.component.css'],
  
})



export class AuthDetailComponent implements OnInit{
  public getJsonValue: any;
  reactiveForm! : FormGroup;
  constructor(
    private route: ActivatedRoute,
    private authorService: AuthorService,
    private location: Location,
    private snackBar: MatSnackBar
    
  ) {}

  author: any;
    

 
  @Output() authorsUpdated = new EventEmitter<Author>();



  
 

  ngOnInit(): void {
   this.getAuthor();
   this.reactiveForm= new FormGroup({
    id : new FormControl('', [Validators.required, Validators.minLength(11),Validators.maxLength(11)]),
    lastName : new FormControl('', [Validators.required]),
    firstName : new FormControl('', [Validators.required]),
    
    phone : new FormControl('', [Validators.required, Validators.minLength(12), Validators.maxLength(12)]),
    contract : new FormControl(true, [Validators.required]),
    city : new FormControl(''),
    state : new FormControl('', [ Validators.minLength(2), Validators.maxLength(2)]),
    zip   : new FormControl('', [ Validators.minLength(5), Validators.maxLength(5)]),
    address  : new FormControl(''),
    });
   
   }

   



   updateAuthor(author:Author){
    this.authorService.updateAuthor(author)
    .subscribe((authors: Author[]) => this.authorsUpdated.emit(author));
    window.location.reload();
   }

   createAuthor(author: Author){
    this.authorService.createAuthor(author)
    .subscribe((authors:Author[]) => this.authorsUpdated.emit(author));
    
   }

   deleteAuthor(author:Author){
    this.authorService.deleteAuthor(author)
    .subscribe((authors:Author[]) => this.authorsUpdated.emit(author));
   }



   getAuthor(){
    const id = this.route.snapshot.paramMap.get('id')!;
    return this.authorService.getAuthor(id)
    .subscribe({
      next: response => {
        this.author = response;
        this.getJsonValue = this.author;
        this.reactiveForm.patchValue({
          lastName: response.lname,
          firstName: response.fname,
          phone: response.phone,
          contract: response.contract,
          city: response.city,
          state: response.state,
          zip: response.zip

        });

      
      console.log(this.author);

      }

    });


    
    
    
    
    
    //  const id = (this.route.snapshot.paramMap.get('id'));
    //  if (id) this.authorService.getAuthor(id)
    //  .subscribe(author => this.Author = author);
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
  //  openSnackBar(string : content){
  //   this.snackBar.open(content) 
  //   horizontalPosition : this.horizontalPosition,
  //   verticalPosition : this.verticalPosition
   
  // }


  get lastName() {
    return this.reactiveForm.get('lastName');
  }

  get firstName(){
    return this.reactiveForm.get('firstName');
  }

  get phone() {
    return this.reactiveForm.get('phone');
  }
  get contract() {
    return this.reactiveForm.get('contract');
  }

  
  get state() {
    return this.reactiveForm.get('state');
  }
  get zip() {
    return this.reactiveForm.get('zip');
  }

  reload():void {
    window.location.reload();
  }



  goBack(): void{
    this.location.back();
  }


}
