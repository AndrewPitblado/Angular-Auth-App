import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';



import { AppComponent } from './app.component';

import { AuthDetailComponent } from './auth-detail/auth-detail.component';
import { AuthListComponent } from './auth-list/auth-list.component';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { MatSortModule } from '@angular/material/sort';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DialogDeleteComponent } from './dialog-delete/dialog-delete.component';
import { AddAuthorComponent } from './add-author/add-author.component';
import { BooksComponent } from './books/books.component';
@NgModule({
  declarations: [
    AppComponent,
    AuthDetailComponent,
    AuthListComponent,
    MessagesComponent,
    DashboardComponent,
    DialogDeleteComponent,
    AddAuthorComponent,
    BooksComponent,
    
  ],
  

  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatSortModule,
    MatTabsModule,
    MatInputModule,
    MatFormFieldModule
    

    
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
