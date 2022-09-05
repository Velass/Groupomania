import { ErrorHandler, Injectable } from '@angular/core';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  
  handleError(error :any) {
    const messageError = (document.getElementById("message") as HTMLInputElement)
    if (error.ok === false) {
        messageError.textContent = error.statusText
    }
    console.log(error)
  }
}