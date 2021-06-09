import { Component, OnInit } from '@angular/core';


import { GamesDataService } from "../games-data.service";
export class Game {
  _id!: number;
  title!: string;
  price!: number;
  rate!: number;
}


@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.css']
})
export class GamesListComponent implements OnInit {

  title: string = 'Mean games';
  games: Game[] = [];
  constructor(private gamesDataService: GamesDataService) {

  }

  ngOnInit(): void {
    this.getGames();
  }

  private getGames(): void {
    this.gamesDataService.getGames().then((response)=>this.gotGame(this,response)).catch(this.handleError);
  }
  private gotGame(gamesListComponent:GamesListComponent, response: Game[]) {
    gamesListComponent.games = response;
  }
  private handleError(error: any) {
    console.log("error: " + error);
  }

}
