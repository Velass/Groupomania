import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header-home',
  templateUrl: './header-home.component.html',
  styleUrls: ['./header-home.component.scss']
})
export class HeaderHomeComponent implements OnInit {
  cheminImage:any = "C:\Users\pc\Desktop\dev web\P7\P7\Groupomania\Frontend\src\app\logo"
  constructor(private auth : AuthService) { }
  isLogin = false;

  ngOnInit(): void {
    console.log(this.isLogin)
  }
 
  logout() {
    console.log(this.isLogin),
    this.auth.logout();
    
    
  }
  
}
