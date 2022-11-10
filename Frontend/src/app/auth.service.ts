import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn: boolean = false
  redirectUrl: string;

  // login(email: string, password: string,): Observable<boolean> {
  //   console.log("test guard 1")
  //   console.log(this.isLoggedIn)
  //   return of(this.isLoggedIn).pipe(
  //     tap(isLoggedIn =>this.isLoggedIn = isLoggedIn)
  //     );
  // }
  
  logout() {
    this.isLoggedIn = false;
    localStorage.clear();
  }
}
