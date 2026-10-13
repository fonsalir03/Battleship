import { Player, Computer } from "./player.js";

export class Game {
  constructor(test=false){
    this.player = new Player()
    this.computer = new Computer()

    this.turn = "p"

    if (test==true){
      this.placePlayerShips();
      this.placeComputerShips();
    }


  }

  placePlayerShips(){
    const board = this.player.board
    const ships = board.ships

    board.placeShip(ships["carrier"],[1,1])
    board.placeShip(ships["battle"],[5,5])
    board.placeShip(ships["destroyer"],[2,6])
    board.placeShip(ships["submarine"],[8,5])
    board.placeShip(ships["patrol"],[6,1])

  }
  placeComputerShips(){
    const board = this.computer.board
    const ships = board.ships

    board.placeShip(ships["battle"],[8,2])
    board.placeShip(ships["submarine"],[1,5])
    board.orientation = "h"
    board.placeShip(ships["carrier"],[2,3])
    board.placeShip(ships["destroyer"],[3,7])
    board.placeShip(ships["patrol"],[7,9])
  }

  attackComputer(cord){
    this.computer.board.receiveAttack(cord)
    this.turn = "c"
  }
  attackPlayer(cord){
    this.player.board.receiveAttack(cord)
    this.turn = "p"
  }

  isGameOver(){
    if (this.player.board.isGameOver()==true || this.computer.board.isGameOver()==true){
      return true
    }
    return false
  }
}
