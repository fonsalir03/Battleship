import { Player, Computer } from "./player.js";

export class Game {
  constructor(shipPlacements, test=false){
    this.player = new Player()
    this.computer = new Computer()

    this.state = {"mode": "start", "turn": "p"}

    this.turn = "p"

    if (test) return
    //const shipPlacementsTest = { carrier: { orientation: "v", cord: [0, 0] }, battle: { orientation: "v", cord: [1, 0] }, destroyer: { orientation: "v", cord: [2, 0] }, submarine: { orientation: "v", cord: [3, 0] }, patrol: { orientation: "v", cord: [4, 0] } };
    this.placePlayerShips(shipPlacements)
    this.placeComputerShips()

  }

  placePlayerShips(shipPlacements){
    const board = this.player.board
    const ships = board.ships

    for (const [shipName, ShipInfo] of Object.entries(shipPlacements)){
      board.orientation = ShipInfo.orientation
      board.placeShip(ships[shipName], ShipInfo.cord)
    }

  }

  placeComputerShips(){
    const board = this.computer.board
    const randCord = this.computer.randomCordinate
    const ships = board.ships

    for (const [shipName, shipObj] of Object.entries(ships)){
      
      let isPlaced = undefined
      let orientation = board.orientation
      while (isPlaced != true){
        if (orientation == "v"){
          board.orientation = "h"
        } else if (orientation=="h"){
          board.orientation = "v"
        }
        isPlaced = board.placeShip(shipObj, randCord())
      }
      console.log(shipObj)
    }

  }

  attackComputer(cord){
    this.computer.board.receiveAttack(cord)

    const randCord = this.computer.randomCordinate()
    this.attackPlayer(randCord)

    this.state.turn = "c"
    return randCord
  }
  attackPlayer(cord){
    this.player.board.receiveAttack(cord)
    this.state.turn = "p"
  }

  isGameOver(){
    if (this.player.board.isGameOver()==true || this.computer.board.isGameOver()==true){
      this.state.mode = "over"
      return true
    }
    return false
  }
}