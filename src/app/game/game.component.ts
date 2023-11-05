import { Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Game } from 'src/models/game';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { doc, onSnapshot } from 'firebase/firestore';

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

  firestore: Firestore = inject(Firestore);

  constructor(public dialog: MatDialog) {
    this.unsubGame = this.subGame();
  }

  ngOnDestroy() {
    this.unsubGame();
  }

  subGame() {
    return onSnapshot(this.getGameRef(), (list: any) => {
      this.gamearray = [];
      list.forEach((element: any) => {
        console.log(element.data(), element.id);
      });
    });
  }

  getGameRef() {
    return collection(this.firestore, 'games');
  }

  ngOnInit(): void {
    this.game = new Game();
    const aCollection = collection(this.firestore, 'games');
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
}
