import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ErrorHandler, Injectable, NgModule, OnInit } from '@angular/core';
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
    this.email = login.email
    this.password = login.password
    this.auth.login(login)
    .subscribe((isLoggedIn: Boolean)=> {
      if(isLoggedIn){
        this.router.navigate(["/postmenu"])
      } else{
        this.router.navigate(["/login"])
      }
    })
  }


}

