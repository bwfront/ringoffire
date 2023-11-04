import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-info',
  templateUrl: './game-info.component.html',
  styleUrls: ['./game-info.component.scss'],
})
export class GameInfoComponent implements OnInit, OnChanges {
  @Input() name: any;

  cardAction = [
    { description: 'All Men Drink' },
    { description: 'All Women Drink' },
    { description: 'Start a Waterfall' },
    { description: 'Pick Someone to Drink Twice' },
    { description: 'Make a Rule' },
    { description: 'Thumb Master' },
    { description: 'Heaven: Point Up' },
    { description: 'Mate: Pick a Drinking Buddy' },
    { description: 'Rhyme: Say a Phrase Others Rhyme With' },
    { description: 'Categories: Pick a Category' },
    { description: 'Never Have I Ever' },
    { description: 'Question Master' },
    { description: 'Snake Eyes: Make Eye Contact and Drink' },
    { description: 'Social: Everyone Drinks' },
    { description: 'Waterfall Continues' },
    { description: 'The Drawer Drinks' },
    { description: 'Reverse Direction of Play' },
    { description: "Skip Next Player's Turn" },
    { description: 'Story Time: Contribute to a Story' },
    { description: 'T-Rex Arms for the Drawer' },
    { description: 'Floor is Lava' },
    { description: 'Silent Mode Activated for the Drawer' },
    { description: 'Hand Out Three Drinks' },
    { description: 'Take Two Drinks' },
    { description: 'Give Two Drinks' },
    { description: 'Last to Drink Takes a Shot' },
    { description: 'Pick a Color: Drink for Each Clothing Item That Color' },
    { description: "Statue: Don't Move When Card is Drawn" },
    { description: 'Mime: Act Out Something for Others to Guess' },
    { description: 'Dance Off: Challenge Someone to Dance' },
    { description: 'Truth or Dare' },
    { description: 'Sing a Song: Others Guess the Song' },
    { description: 'Accent: Speak in an Accent Until Next Turn' },
    { description: 'Joke: Tell a Joke or Drink' },
    { description: 'Name Game: Say a Name and Follow the Pattern' },
    { description: "Drink if You're Wearing Jeans" },
    { description: 'Swap Drinks with Someone' },
    { description: 'Rock, Paper, Scissors with Someone' },
    { description: 'Oldest Player Drinks' },
    { description: 'Youngest Player Drinks' },
    { description: 'Toast: Make a Toast Everyone Drinks to' },
    { description: 'Viking Master: Last to Row Drinks' },
    { description: 'Pick Someone to Finish Their Drink' },
    { description: 'Arm Wrestling Challenge' },
    { description: 'Thumb on Table: Last to Do So Drinks' },
    { description: 'Stand on One Leg Until Next Turn' },
    { description: 'No Cursing: Curse and You Drink' },
    { description: 'First to Use Bathroom Drinks' },
    { description: 'Zoo: Act Out an Animal' },
    { description: 'Ghost: Be Ignored Until Next Turn' },
    { description: 'Wear the Card Hat' },
    { description: 'Charades: Act Out a Movie' },
    { description: 'Two Truths and a Lie' }
  ];

  description: string = '';
  @Input() card: string;

  ngOnChanges() {
    if (this.card) {
      let cardNumber = +this.card.split('_')[1];
      this.description = this.cardAction[cardNumber - 1].description;
    }
  }

  ngOnInit(): void {
  }
}
