import { NgModule } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import{MatCardModule} from '@angular/material/card';
import{MatListModule} from "@angular/material/list";
import{MatIconModule} from '@angular/material/icon';
import {MatSortModule } from '@angular/material/sort';
import{MatInputModule} from '@angular/material/input';
import{MatTabsModule} from '@angular/material/tabs';
import {MatFormFieldModule } from '@angular/material/form-field';
import{MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import{MatRadioModule} from '@angular/material/radio';
import{MatSnackBarModule} from  '@angular/material/snack-bar';
import{MatDialogModule} from '@angular/material/dialog';


const MaterialComponents = [
  MatTableModule,
  MatButtonModule,
  MatCardModule,
  MatListModule,
  MatIconModule,
  MatSortModule,
  MatTabsModule,
  MatInputModule,
  MatFormFieldModule,
  MatPaginatorModule,
  MatRadioModule,
  MatSnackBarModule,
  MatDialogModule,
  
  
  
  

];
@NgModule({
  
  imports: [
    MaterialComponents
   
  
    
    
  ], 
  exports: [
    MaterialComponents
  ]
})
export class MaterialModule { }
