import {
  Carrier,
  Battleship,
  Destroyer,
  Submarine,
  PatrolBoat,
} from "./ship.js";

class Cell {
  constructor() {
    this.ship = "unset";
    this.attacked = false;
  }
}

export class Gameboard {
  //needs a corindate plan to represet ship positions [x]
  //grid size is 10x10 [x]
  //construct all ship types [x]
  //placeShip(ship,x,y) [x]
  //property to track orientation [x]
  //receiveAttack() takes a pair of cordinates and determines if its a hit or miss and keeps track of the cordninate hit [x]
  //array of cordinates that were attacked [x]
  //isGameOver() reports true if all ships are sunk
  // property that tracks the sunken ships


  constructor() {
    this.grid = new Array();
    for (let i = 0; i < 10; i++) {
      this.grid.push([]);
      for (let j = 0; j < 10; j++) {
        this.grid[i].push(new Cell());
      }
    }

    this.ships = {
      carrier: new Carrier(),
      battle: new Battleship(),
      destroyer: new Destroyer(),
      submarine: new Submarine(),
      patrol: new PatrolBoat(),
    };

    this.orientation = "v";

    this.hitCells = [];
  }

  getCell(x, y) {
    if (y >= this.grid.length || x >= this.grid.length) return;
    return this.grid[y][x];
  }

  setCell(ship, x, y) {
    this.getCell(x, y).ship = ship;
  }

  //places the head of the ship at specified cordinates, [x,y]
  placeShip(ship, cordinates) {
    const x = cordinates[0];
    const y = cordinates[1];
    ship.orientation = this.orientation;

    for (let i = 0; i < ship.length; i++) {
      let cell = undefined;
      if (ship.orientation == "v") cell = this.getCell(x, y + i);
      else if (ship.orientation == "h") cell = this.getCell(x + i, y);

      if (!cell) return;
      else if (cell.ship != "unset") return;
    }

    for (let i = 0; i < ship.length; i++) {
      if (ship.orientation == "v") {
        this.setCell(ship, x, y + i);
      }
      if (ship.orientation == "h") {
        this.setCell(ship, x + i, y);
      }
    }
  }

  //receiveAttack([x,y])
  receiveAttack(cordinates) {
    const cell = this.getCell(cordinates[0], cordinates[1]);
    if (!cell) return;
    cell.attacked = true;
    this.hitCells.push(cordinates);

    if (cell.ship == "unset") return;
    cell.ship.hit();
  }
}
