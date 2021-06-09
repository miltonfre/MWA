import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService, Credentials } from '../authentication.service';
import {FormsModule ,ReactiveFormsModule } from '@angular/forms';




@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  message: string = "";
  err: string = "";
  username: string = "";
  password: string = "";
  passwordRepeat: string = "";
  constructor(private authService:AuthenticationService, private router: Router) { }

  ngOnInit(): void {
  }
  public register(event: Event): void {
    event.preventDefault();
    if (!this.username || !this.password || !this.passwordRepeat) {
      this.err = "enter all fields";
    }
    else {

      if (this.password !== this.passwordRepeat) {
        this.err = "Passwords must match";
      }
      else {
        this.doRegister();
      }
    }
  }
  private doRegister(){
    const credentials: Credentials = {
      userName: this.username,
      password: this.password,
    }
    this.authService.register(credentials).then(()=>this.registerDone()).catch(this.registerError);
    
  }
  private registerDone(){
    this.router.navigate(['/games']);
  }
  private registerError(error: HttpErrorResponse){
    
  }
}
