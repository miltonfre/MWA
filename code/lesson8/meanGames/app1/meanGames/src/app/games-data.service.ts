import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';

import { Game } from "./games-list/games-list.component";
@Injectable({
  providedIn: 'root'
})
export class GamesDataService {
  private baseURL = "http://localhost:3006/api/games";

  constructor(private http: HttpClient) {



  }

  public getGames(): Promise<Game[]> {
    //1. Build URL
    const url: string = this.baseURL;
    //2.tell HTTP service to make a request
    //3. convert observable to a Promise
    //4. Convert the response to JSON
    //5. return response
    //6. Catch and handle errors
    return this.http.get(url).toPromise().then(this.gotGame).catch(this.handleError);
  }

  private gotGame(response: any): Game[] {
    return response as Game[];
  }

  private handleError(error: any): Game[] {
    console.log("error: " + error);
    return [];
  }

  public getGameyId(gameId: String): Promise<Game> {

    const url: string = this.baseURL + "/" + gameId;
    return this.http.get(url).toPromise().then(this.gotOneGame).catch(this.handleErrorOneGame);
  }


  public deteleGame(gameId: String): Promise<string> {

    const url: string = this.baseURL + "/" + gameId;
    return this.http.delete(url).toPromise().then(this.deletedOneGame).catch(this.handleErrorDeleteOneGame);
  }
  private deletedOneGame(response: any): string {
    return "Game Deleted";
  }

  private handleErrorDeleteOneGame(error: HttpErrorResponse): string {
    console.log(error.message);
    return error.message;
  }
  private gotOneGame(response: any): Game {
    return response as Game;
  }

  private handleErrorOneGame(error: any): Game {
    return new Game();
  }
}
