import { Component, HostListener, OnInit } from '@angular/core';
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

  lastCard = false;
  playedCard: string;
  game: Game;

  unsubGame: any;
  gameId: string;

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private gameService: GameService
  ) {}

  ngOnInit(): void {
    this.newGame();
    this.route.params.subscribe((params) => {
      this.gameId = params['id'];
      this.unsubGame = this.gameService.subscribeToGame(
        params['id'],
        (gameData) => {
          this.refreshGameData(gameData);
        }
      );
    });
  }

  takeCard() {
    if (!this.game.pickCardAnimation && this.game.stack.length > 0) {
      this.game.currentCard = this.game.stack.pop();
      this.game.pickCardAnimation = true;
      this.game.currentPlayer++;
      this.game.currentPlayer =
      this.game.currentPlayer % this.game.players.length;
      this.updateGameData();
      this.getNameCurrentPlayer();
      setTimeout(() => {
        this.lastCard = true;
        this.game.lastCards.push(this.game.currentCard);
        this.game.playCard = this.game.currentCard;
        this.game.pickCardAnimation = false;
        this.updateGameData();
      }, 1000);
    }
  }

  getNameCurrentPlayer() {
    this.game.nameCurrentPlayer = this.game.players[this.game.currentPlayer];
    this.updateGameData();
  }

  newGame() {
    this.game = new Game();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);
    dialogRef.afterClosed().subscribe((name: string) => {
      if (name) {
        this.game.players.push(name);
        this.updateGameData();
      }
    });
  }

  updateGameData(){
    this.gameService.updateGame(this.gameId ,this.game.toJson());
  }
  

  refreshGameData(game: any) {
    this.game.players = game.players;
    this.game.currentPlayer = game.currentPlayer;
    this.game.lastCards = game.lastCards;
    this.game.playCard = game.playCard;
    this.game.stack = game.stack;
    this.game.currentCard = game.currentCard;
    this.game.pickCardAnimation = game.pickCardAnimation;
    this.game.nameCurrentPlayer = game.nameCurrentPlayer;
  }

  calculateTop(index: number): number {
    const baseTop = 100;
    const increment = 90;
    if (window.innerWidth <= 985) {
      return 20 + index * 60;
    } else {
      return baseTop + index * increment;
    }
  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.calculateTop(event);
  }
}
