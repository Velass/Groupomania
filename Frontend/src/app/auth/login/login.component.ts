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



  constructor(private http: HttpClient,
    private router: Router,
    private authService: AuthService,) { }


  email: string;
  password: string;
  message: string;
  auth: AuthService
  login: any

  ngOnInit(): void {
    this.auth = this.authService
  }

  onLoginCreate(login: { email: string, password: string }): any {
    this.http.post("http://localhost:3000/api/auth/login", login, { responseType: "json" })
      .subscribe((res: any,) => {
        (console.log(res))
        const token =  res
        if (token != null) {
          this.auth.isLoggedIn = true
        }
        console.log(token)
        localStorage.setItem('token', JSON.stringify(token),)
        this.router.navigate(["/postmenu"]);
      });

  }


}

