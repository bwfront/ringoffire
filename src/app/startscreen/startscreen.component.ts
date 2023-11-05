import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../firebase-services/game.services';

@Component({
  selector: 'app-startscreen',
  templateUrl: './startscreen.component.html',
  styleUrls: ['./startscreen.component.scss'],
})
export class StartscreenComponent {
  constructor(private routuer: Router, private gameService: GameService) {}

  async newGame() {
   let test:string = await this.gameService.addNewGame();
   console.log(test);
   
    this.routuer.navigateByUrl('/game/' + test);
  }
}
