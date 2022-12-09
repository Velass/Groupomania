import { Injectable } from '@angular/core';
import { Observable, of} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,) { }


  isLoggedIn: boolean = false
  messageError : any


  ngOnInit(): void {

  }

  login(Login: { email: string, password: string }): Observable<boolean> {
    this.http.post("http://localhost:3000/api/auth/login", Login, { responseType: "json" })
      .subscribe((res: any,) => {
        const token = res
        if (token != null) {
          this.isLoggedIn = true
          localStorage.setItem('token', JSON.stringify(token),)
          this.router.navigate(["/postmenu"]);
          

        }
      },
      (err) => {
      });
      return of(this.isLoggedIn)
      

  }
  logout() {
    this.isLoggedIn = false;
    localStorage.clear();
  }
}
