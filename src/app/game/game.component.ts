import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
  lastCard = false;
  currentCard: string = '';
  playedCard: string = '';
  game: Game;

  constructor() {}

  ngOnInit(): void {
    this.game = new Game();
    console.log(this.game);
  }

  takeCard() {
    if (!this.pickCardAnimation && this.game.stack.length > 0) {
      this.currentCard = this.game.stack.pop();
      this.pickCardAnimation = true;
      setTimeout(() => {
        this.lastCard = true;
        this.playedCard = this.currentCard;
        this.pickCardAnimation = false;
      }, 1500);
    }
  }

  newGame() {
    this.game = new Game();
  }
}
