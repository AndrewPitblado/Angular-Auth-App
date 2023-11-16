import { Component, Output, EventEmitter} from '@angular/core';
import { AuthorService } from '../author.service';
import { Author } from '../author';


@Component({
  selector: 'app-dialog-delete',
  templateUrl: './dialog-delete.component.html',
  styleUrls: ['./dialog-delete.component.css']
})
export class DialogDeleteComponent {

  @Output() authorsUpdated = new EventEmitter<Author>();

  author : any;
  constructor(private authorService : AuthorService){}


  
   



}
