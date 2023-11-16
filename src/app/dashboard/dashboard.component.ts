import { Component, OnInit } from '@angular/core';

import { Author } from '../author';
import { AuthorService } from '../author.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  authors: any;

  constructor(private authorService: AuthorService) {}
  links = ['Authors-Table','Top Authors', 'Add Author' ];
  activeLink = this.links[1];
  ngOnInit(): void {
    this.getAuthors();
  }


  getAuthors(): void{
    this.authorService.getAuthors()
      .subscribe({
        next: response => {
          this.authors = response.splice(0,6);
        }
      });
  }


  twoText: string = 'is one of our top authors' 
                      + 'with best sellers including, Witching Hour, and Hops';
  MitchyText: string = 'is a new author to PubsINC but already' 
                      + 'has made thier mark as one of our best up' 
                      + 'and coming authors';
}
