import { Component, OnInit } from '@angular/core';
import { Expand } from '../models/expand.model'
import { fail } from 'assert';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public expand: Expand;

  constructor() {
    this.expand = new Expand(false, false, false);
  }

  ngOnInit() {
  }

  expandMenu(event): void {
    if(this.expand[event.target.id]){
      this.expand[event.target.id] = false;
    }else{
      this.expand[event.target.id] = true;     
    }
  }

}
