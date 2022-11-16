import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,) { }


  isLoggedIn: boolean = false


  ngOnInit(): void {

  }

  login(Login: { email: string, password: string }): Observable<boolean> {
    this.http.post("http://localhost:3000/api/auth/login", Login, { responseType: "json" })
      .subscribe((res: any,) => {
        const token = res
        console.log(res)
        console.log(token)
        if (token != null) {
          this.isLoggedIn = true
          localStorage.setItem('token', JSON.stringify(token),)
          this.router.navigate(["/postmenu"]);
          console.log(this.isLoggedIn)
          

        }
      });
      console.log("test")
      
     console.log(this.isLoggedIn)
      return of(this.isLoggedIn)
      

  }
  logout() {
    this.isLoggedIn = false;
    localStorage.clear();
  }
}
