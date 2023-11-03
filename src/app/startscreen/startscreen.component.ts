import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-startscreen',
  templateUrl: './startscreen.component.html',
  styleUrls: ['./startscreen.component.scss']
})
export class StartscreenComponent {

  constructor(private routuer: Router){}

  newGame(){
    this.routuer.navigateByUrl('/game');
  }
}
