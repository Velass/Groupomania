import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ErrorHandler, NgModule, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private http: HttpClient,private router: Router, private auth : AuthService, private elRef: ElementRef){

  }

  isLogin = false
  ngOnInit(): void {
    this.isLogin = this.auth.isLogin()
  }
  mytest(){
    return false
     
   }
  onLoginCreate(login:{email: string, password: string} ): any{
    // this.elRef.nativeElement.querySelector('#form').submit();
    console.log(login);
    this.http.post("http://localhost:3000/api/auth/login",login, {responseType: "json"})
    .subscribe((res: any,) => {
      (console.log(res)) 
      const token = res["token"]
      console.log(token)
      localStorage.setItem('token',token)
      this.router.navigate(["/postmenu"]);
      });

}

  
}



