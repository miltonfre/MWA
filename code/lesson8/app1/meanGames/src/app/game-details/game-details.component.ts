import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GamesDataService } from '../games-data.service';
import { Game } from '../games-list/games-list.component';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css']
})
export class GameDetailsComponent implements OnInit {
  private gameId: any;
  public game:Game=new Game();
  constructor(private gamesDataService: GamesDataService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.gameId=this.activatedRoute.snapshot.paramMap.get('gameId');
    this.getGames(this.gameId);
  }

  private getGames(gameId:String): void {
    this.gamesDataService.getGameyId(gameId).then((response)=>this.gotOneGame(this,response)).catch(this.handleError);
  }
  private gotOneGame(gameDetailsComponent:GameDetailsComponent, response: Game) {
    gameDetailsComponent.game = response;
  }
  private handleError(error: any) {
    console.log("error: " + error);
  }

}
