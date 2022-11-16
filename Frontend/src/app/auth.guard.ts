import { Injectable } from '@angular/core';
import { CanActivate, Router, } from '@angular/router';
import { take, tap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(): boolean {
    if (this.authService.isLoggedIn == true) {
      return true;
    } else {
      this.router.navigate(["/login"]);
      return false;
    }
  }

  // canActivate() {
  //   return this.authService.isLoggedIn$.pipe(
  //     take(1),
  //     tap(authService =>{
  //       if (!authService){
  //         this.router.navigate(["/login"])
  //       }
  //     })
  //   )
  // }

}
