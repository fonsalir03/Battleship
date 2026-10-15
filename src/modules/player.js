import { Gameboard } from "./gameboard.js";


class Player {
  constructor() {
    this.board = new Gameboard();
    this.ships = this.board.ships
  }
}
class Computer {
  constructor() {
    this.board = new Gameboard();
    this.ships = this.board.ships
    this.generatedCordinates = []
  }
  hasCordinate(cords, sCord) {
    return cords.some((cord) => cord[0] === sCord[0] && cord[1] === sCord[1]);
  }

  //will always return unique set of numbers between 0,9 or undefined if not unique
  //NOTE: math.random will not return a value equal to the max
  randomCordinate(maxHeight=this.board.height, maxWidth=this.board.width){
    let cordinate = [undefined,undefined];

    //checks if cordinate has already been generated
    while (this.hasCordinate(this.generatedCordinates, cordinate) || cordinate[0] == undefined){
        const x = Math.floor(Math.random() * maxWidth);
        const y = Math.floor(Math.random() * maxHeight);
        cordinate = [x,y]
    }

    this.generatedCordinates.push(cordinate)
    return cordinate

  }
}

export { Player, Computer };