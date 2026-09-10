import { Carrier, Battleship, Destroyer, Submarine, PatrolBoat } from "./ship.js"

export class Gameboard {
    //needs a corindate plan to represet ship positions [x]
    //grid size is 10x10 [x]
    //construct all ship types [x]
    //placeShip(x,y,orienation)
    //receiveAttack() takes a pair of cordinates and determines if its a hit or miss and keeps track of the cordninate hit
    // if hit, update that ship object
    // if miss, keep track of that missed attack
    //isGameOver() reports true if all ships are sunk
    // property that tracks the amount of sunken ships
    //array of cordinates that were attacked but did not have a ship

    

    constructor(){
        this.grid = new Array(10).fill(new Array(10).fill([]))
        this.ships = [new Carrier, new Battleship, new Destroyer, new Submarine, new PatrolBoat]
    }
}