import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ErrorHandler, NgModule, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  message: string;
  isLogin = false;
  auth: AuthService

  constructor(private http: HttpClient,
    private router: Router,
    private authService: AuthService,) { }


  ngOnInit(): void {
    this.auth = this.authService
  }

  // onLoginCreate(login: { email: string, password: string }): any {
    login(){
    this.auth.login(this.email, this.password)
      .subscribe((isLoggedIn: Boolean) => {
      this.setMessage();
      if (isLoggedIn) {
        this.router.navigate(["/postmenu"]);
      } else {
        this.router.navigate(["/login"]);

      }
    })
    // console.log(login);
    // this.http.post("http://localhost:3000/api/auth/login", login, { responseType: "json" })
    //   .subscribe((res: any,) => {
    //     (console.log(res))
    //     const token = res["token"]
    //     console.log(token)
    //     localStorage.setItem('token', token)
    //     this.router.navigate(["/postmenu"]);
    //   });

  }

  logout() {
    this.auth.logout();
    this.setMessage
  }

  setMessage() {
    if (this.auth.isLoggedIn) {
      this.message = "Vous êtes connecté";
    } else {

    }
  }

}



