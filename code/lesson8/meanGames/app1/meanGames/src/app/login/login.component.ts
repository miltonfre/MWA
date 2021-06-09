import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService, Credentials } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = "";
  password: string = "";
  err: string = "";
  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
  }

  login(event: Event): void {
    event.preventDefault();
    if (!this.username || !this.password) {
      this.err = "userName and password are required";
    }
    else {
      this.doLogin();
    }
  }
  private doLogin() {
    const credentials: Credentials =
    {
      userName: this.username,
      password: this.password
    }
    this.authService.login(credentials).then(()=>this.loginSuccess());
  }

  private loginSuccess(){
    this.router.navigate(['/games']);
  }
}
