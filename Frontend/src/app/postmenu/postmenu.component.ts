import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-postmenu',
  templateUrl: './postmenu.component.html',
  styleUrls: ['./postmenu.component.scss']
})
export class PostmenuComponent implements OnInit {

  constructor(public router: Router) {

  }


  ngOnInit(): void {
  }

  postmenu(){
    const postMenu =document.getElementById("log") 
    postMenu!.addEventListener("click", (e) =>{
      console.log(e)
    })
  
  
  }
}

  

