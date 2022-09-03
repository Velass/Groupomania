import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})

export class SignUpComponent implements OnInit {

  constructor(private http: HttpClient) {

  }

  ngOnInit(): void {
  }
  onRegedex() {
    const inputEmail = (document.getElementById("email") as HTMLInputElement)
    inputEmail.addEventListener("change", (e) => {
      console.log(e)
      const emailRegExp = /^[\w-\.]+@([\w-]+\.)+[a-z]{2,4}$/g;
      const messageError = (document.getElementById("message") as HTMLInputElement)
      const inputEmail = (document.getElementById("email") as HTMLInputElement)
      console.log(messageError)
      if (emailRegExp.test(inputEmail.value)) {
        messageError.textContent = "";
        return true;

      } else {
        messageError.textContent = "Merci de bien vouloir saisir un Email valide"
        return false;
      }
    })
  }
  onSignupCreate(signup: { email: string, password: string }) {
    const messageError = (document.getElementById("message") as HTMLInputElement)
    if (messageError.textContent! === "") {
      
      this.http.post("http://localhost:3000/api/auth/signup", signup)
        .subscribe((res) => {
          console.log(res)


        })
    } else {
      (messageError.textContent! === "veuillez sélectionner une adresse mail valide"); {
      
      }

    }


  }



}
