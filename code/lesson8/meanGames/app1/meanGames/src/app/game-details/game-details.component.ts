import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { GamesDataService } from '../games-data.service';
import { Game } from '../games-list/games-list.component';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css']
})
export class GameDetailsComponent implements OnInit {
  private gameId: any;
  public game: Game = new Game();
  public message: string = "";
  constructor(private gamesDataService: GamesDataService, private activatedRoute: ActivatedRoute
    , private router: Router) { }

  ngOnInit(): void {
    this.gameId = this.activatedRoute.snapshot.paramMap.get('gameId');
    this.getGames(this.gameId);
  }

  private getGames(gameId: String): void {
    this.gamesDataService.getGameyId(gameId).then((response) => this.gotOneGame(this, response)).catch(this.handleError);
  }
  private gotOneGame(gameDetailsComponent: GameDetailsComponent, response: Game) {
    gameDetailsComponent.game = response;
  }
  private handleError(error: any) {
    console.log("error: " + error);
  }

  public onClickDelete() {
    this.gamesDataService.deteleGame(this.gameId).then((response) => this.gameDeleted(this, response)).catch((response) => this.gameDeletedError(this, response));
    
  }
  private gameDeleted(gameDetailsComponent: GameDetailsComponent, response: string) {
    this.message = response;
    this.router.navigate(['/games']);
  }
  private gameDeletedError(gameDetailsComponent: GameDetailsComponent, response: string) {
    this.message = response;
  }
}
