import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Game } from 'src/models/game';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../firebase-services/game.services';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
  lastCard = false;
  currentCard: string = '';
  playedCard: string;
  game: Game;
  nameCurrentPlayer: string;

  unsubGame;

  gamearray = [];

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private gameService: GameService
  ) {}

  ngOnInit(): void {
    this.newGame();
    this.route.params.subscribe((params) => {
      console.log(params['id']);
      this.unsubGame = this.gameService.subscribeToGame(
        params['id'],
        (gameData) => {
          this.refreshGame(gameData);
        }
      );
    });
  }

  takeCard() {
    if (!this.pickCardAnimation && this.game.stack.length > 0) {
      this.game.currentPlayer++;
      this.game.currentPlayer =
        this.game.currentPlayer % this.game.players.length;
      this.getNameCurrentPlayer();
      this.currentCard = this.game.stack.pop();
      console.log(this.currentCard);

      this.pickCardAnimation = true;
      setTimeout(() => {
        this.lastCard = true;
        this.game.lastCards.push(this.currentCard);
        this.playedCard = this.currentCard;
        this.pickCardAnimation = false;
      }, 1000);
    }
  }

  getNameCurrentPlayer() {
    this.nameCurrentPlayer = this.game.players[this.game.currentPlayer];
  }

  newGame() {
    this.game = new Game();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);
    dialogRef.afterClosed().subscribe((name: string) => {
      if (name) {
        this.game.players.push(name);
      }
    });
  }

  refreshGame(game: any) {
    this.game.players = game.players;
    this.game.currentPlayer = game.currentPlayer;
    this.game.lastCards = game.lastCards;
    this.game.playCard = game.playCard;
    this.game.stack = game.stack;
  }
}
