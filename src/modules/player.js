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
  }
}

export { Player, Computer };