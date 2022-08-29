import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-home',
  templateUrl: './header-home.component.html',
  styleUrls: ['./header-home.component.scss']
})
export class HeaderHomeComponent implements OnInit {
  cheminImage:any = "C:\Users\pc\Desktop\dev web\P7\P7\Groupomania\Frontend\src\app\logo"
  constructor() { }

  ngOnInit(): void {
  }

}
