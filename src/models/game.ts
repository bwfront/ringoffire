export class Game {
  public players: string[] = [];
  public stack: string[] = [];
  public playCard: string[] = [];
  public currentPlayer: number = 0;
  public lastCards: string[] = [];

  constructor() {
    for (let i = 1; i < 14; i++) {
      this.stack.push('ace_' + i);
      this.stack.push('clubs_' + i);
      this.stack.push('diamonds_' + i);
      this.stack.push('hearts_' + i);
    }

    shuffle(this.stack);
  }

  public toJson(){
    return {
      players: this.players,
      stack: this.stack,
      playCard: this.playCard,
      currentPlayer: this.currentPlayer,
      lastCards: this.lastCards
    }
  }
}

function shuffle(array: string[]) {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}
