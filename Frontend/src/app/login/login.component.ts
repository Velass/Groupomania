import { HttpClient } from '@angular/common/http';
import { Component, ErrorHandler, NgModule, OnInit } from '@angular/core';
import { GlobalErrorHandler } from '../error.service';




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
    const messageError = (document.getElementById("message") as HTMLInputElement)
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
