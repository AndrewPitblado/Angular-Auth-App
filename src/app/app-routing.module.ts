import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



import { AuthListComponent } from './auth-list/auth-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthDetailComponent } from './auth-detail/auth-detail.component';
import { AddAuthorComponent } from './add-author/add-author.component';
import { BooksComponent } from './books/books.component';




const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'authors', component: AuthListComponent, data:{animation:'isLeft'}},
  {path: 'dashboard', component: DashboardComponent, data:{animation: 'isLeft'}},
  {path: 'detail/:id', component: AuthDetailComponent},
  {path: 'addAuthor', component: AddAuthorComponent, data:{animation: 'isRight'}},
  {path: 'books', component: BooksComponent, data: {animation:'isRight'}}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
