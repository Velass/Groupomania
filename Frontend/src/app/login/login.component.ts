import { Component, OnInit, Input } from '@angular/core';
import { login } from '../models/login.models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Input() login!: login;
  email!: string;
  password!: string;


  ngOnInit() {
    this.email = "test@test.com"
    this.password = "test"
  }

}
