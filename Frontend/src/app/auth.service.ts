import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn: boolean = false
  // redirectUrl: string;

  login(email: string, password: string,): Observable<boolean> {
    const isLoggedIn = (email == "test@test.fr" && password == "test");
    console.log("test guard 1")
    return of(isLoggedIn).pipe(
      tap(isLoggedIn =>this.isLoggedIn = isLoggedIn)
      );
  }
  
  logout() {
    this.isLoggedIn = false;
  }
}
