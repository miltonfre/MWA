import { inject, Injectable } from '@angular/core';
import { DataServiceService } from './data-service.service';
import { BROWSER_STORAGE } from "./storage";
import { User } from "./user";
export class Credentials {
  userName!: string;
  password!: string;
}

@Injectable({
  providedIn: 'root'
})


export class AuthenticationService {
  //@inject(BROWSER_STORAGE)
  //constructor(private dataService: DataServiceService, @inject(BROWSER_STORAGE) private storage: Storage) { }
  constructor(private dataService: DataServiceService) { }

  public register(user: Credentials): Promise<unknown> {
    console.log(user);
    return this.dataService.postOne("users", user);
  }
  

  public getToken(): string {
    return "";
    //return this.storage.getItem("games-token") as string;
  }
  public saveregister(response: any) {
    if (response.success as boolean) {
      this.saveToken(response.token);
    }

  }
  public saveToken(token: string) {
    return "";
    //this.storage.setItem('games-token', token)
  }
  public login(user: Credentials): Promise<unknown> {
    console.log(user);
    return this.dataService.postOne("auth", user);
  }

  public logout(): void {
    
    //this.storage.removeItem('games-token');
  }


  public isLoggedIn(): boolean {
    const token = this.getToken()
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.exp > (Date.now() / 1000);
      return true;
    } else {
      return false;
    }
  }

  public getCurrentUser(): User {
    if (this.isLoggedIn()) {
      const token: string = this.getToken();
      const { name } = JSON.parse(atob(token.split(".")[1]));
      return { name } as User;
    }
    else {
      return {} as User;
    }
  }
}
