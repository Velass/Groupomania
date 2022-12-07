import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})

export class SignUpComponent implements OnInit {

  constructor(private http: HttpClient,
    private router: Router,
    private authService: AuthService,) {

  }
  auth: AuthService

  ngOnInit(): void {
    this.auth = this.authService
  }
  onRegedexEmail() {
    verifyRegexEmail()
  }

  onRegedexPassword() {
    verifyRegexPassword()
  }



  onSignupCreate(signup: { email: string, password: string, }) {
    const messageError = (document.getElementById("message") as HTMLInputElement)
    if (!verifyRegexEmail()) {
      return
    }
    if (!verifyRegexPassword()) {
      return
    }
    if (messageError.textContent === "") {
      this.http.post("http://localhost:3000/api/auth/signup", signup)
        .subscribe((res) => {
          this.router.navigate(["/postmenu"]);


        })

    } 
  }
}

function verifyRegexEmail(): boolean {
  const inputEmail = (document.getElementById("email") as HTMLInputElement)

  const emailRegExp = /^[\w-\.]+@([\w-]+\.)+[a-z]{2,4}$/g;
  const messageError = (document.getElementById("message") as HTMLInputElement)
  if (emailRegExp.test(inputEmail.value)) {
    messageError.textContent = "";
    return true;

  } else {
    messageError.textContent = "Merci de bien vouloir saisir un Email valide"
    return false;
  }


}


function verifyRegexPassword(): boolean {
  const inputPassword = (document.getElementById("password") as HTMLInputElement)
  const passwordRegExp = /^(?=.*[A-Za-z])[A-Za-z\d]{3,}$/g;
  const messageError = (document.getElementById("message") as HTMLInputElement)
  if (passwordRegExp.test(inputPassword.value)) {
    messageError.textContent = "";
    return true;

  } else {
    messageError.textContent = "Mot de passe a 3 caractères minimum "
    return false;
  }



}