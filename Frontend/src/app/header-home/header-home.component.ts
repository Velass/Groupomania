import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header-home',
  templateUrl: './header-home.component.html',
  styleUrls: ['./header-home.component.scss']
})
export class HeaderHomeComponent implements OnInit {
  cheminImage:any = "C:\Users\pc\Desktop\dev web\P7\P7\Groupomania\Frontend\src\app\logo"
  constructor(public auth : AuthService,) { }

 

  ngOnInit(): void {

    

  }

  
 
  logout() {
    this.auth.logout();
  }
  
}
