import { Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms'
import { RouterModule, RouterOutlet } from '@angular/router';
import{ fader } from './route-animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    fader,
    //slider,
    //transformer,
    //stepper

  ]
})
export class AppComponent implements OnInit{
  title: string = 'Author-App';
  constructor(private fb: FormBuilder) {}

  links = ['authors', 'dashboard', 'addAuthor', 'books'];
  titles = ['Authors', 'Top Authors', 'Add Author', 'Books'];

  activeLink = this.titles[0];

  prepareRoute(outlet:RouterOutlet){
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  
  ngOnInit(): void {
    
  }


}
