import { HttpClient } from '@angular/common/http';
import { Component, ErrorHandler, NgModule, OnInit } from '@angular/core';
import { GlobalErrorHandler } from '../error.service';
import { PostmenuComponent } from '../postmenu/postmenu.component';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private http: HttpClient){

  }


  ngOnInit(): void {
  }
  onLoginCreate(login:{email: string, password: string} ){
    console.log(login);
  if (ErrorHandler) {
    this.http.post("http://localhost:3000/api/auth/login", login)
      .subscribe((res) => {
        (console.log(res))

        
        
        


      });
      console.log(GlobalErrorHandler )
  } else {
    
  }
}

}

