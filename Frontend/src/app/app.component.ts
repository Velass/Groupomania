import { Component, OnInit } from '@angular/core';
import { login } from './models/login.models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  myLogin!: login;

  ngOnInit() {
   
  }
}

