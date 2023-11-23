import { Component, EventEmitter,Input, Output, OnInit } from '@angular/core';
import { Author } from '../author';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AuthorService } from '../author.service';
import { Form, FormControl, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormField } from '@angular/material/form-field';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarModule, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-author',
  templateUrl: './add-author.component.html',
  styleUrls: ['./add-author.component.css']
})
export class AddAuthorComponent implements OnInit{


  title = 'AddAuthor';
  reactiveForm!: FormGroup;
  

  @Output() authorsUpdated = new EventEmitter<Author>();

  public getJsonValue: any;
  constructor(
    private route: ActivatedRoute,
    private authorService: AuthorService,
    private location: Location,
    private snackBar: MatSnackBar,
    private fb: FormBuilder
    
  ) {}

  ngOnInit(): void {
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


  horizontalPosition : MatSnackBarHorizontalPosition = 'center';
  verticalPosition : MatSnackBarVerticalPosition = 'bottom';

  showSnackbar(content: string, action: string | undefined, duration: any){
   this.snackBar.open(content, action, {
     duration: 2000,
     horizontalPosition : this.horizontalPosition,
     verticalPosition : this.verticalPosition,
   });
  }

  get id(){
    return this.reactiveForm.get('id');
  }

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




  onSubmit(){
    console.log(this.reactiveForm);
    this.createAuthor(this.reactiveForm.value);
    this.location.back();
    window.location.reload();
  }

  author: any;

  


  


  createAuthor(author: Author){
    this.authorService.createAuthor(author)
    .subscribe((authors:Author[]) => this.authorsUpdated.emit(author));
    
   }

}
