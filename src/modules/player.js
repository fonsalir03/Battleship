import { Gameboard } from "./gameboard.js";

class Player {
  constructor() {
    this.board = new Gameboard();
  }
}
class Computer {
  constructor() {
    this.board = new Gameboard();
  }
}

export { Player, Computer };
