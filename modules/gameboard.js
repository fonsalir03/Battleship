import { Carrier, Battleship, Destroyer, Submarine, PatrolBoat } from "./ship.js"

export class Gameboard {
    //needs a corindate plan to represet ship positions [x]
    //grid size is 10x10 [x]
    //construct all ship types [x]
    //placeShip(ship,x,y) [x]
    //property to track orientation [x]
    //receiveAttack() takes a pair of cordinates and determines if its a hit or miss and keeps track of the cordninate hit
    // if hit, update that ship object
    // if miss, keep track of that missed attack
    //isGameOver() reports true if all ships are sunk
    // property that tracks the amount of sunken ships
    //array of cordinates that were attacked but did not have a ship

    

    constructor(){
        this.grid = new Array(10)
        for (let i = 0; i < this.grid.length; i++){
            this.grid[i] = new Array(10).fill("unset")
        }

        this.ships = {"carrier": new Carrier, "battle": new Battleship, "destroyer": new Destroyer, "submarine": new Submarine, "patrol": new PatrolBoat}
        this.orientation = "v"
    }

    getCell(x,y){
        if (y>=this.grid.length || x>=this.grid.length) return
        return this.grid[y][x]
    }

    setCell(ship,x,y){
        this.grid[y][x] = ship
    }

    //places the head of the ship at specified cordinates, [x,y]
    placeShip(ship, cordinates){
        
        const x = cordinates[0]
        const y = cordinates[1]
        ship.orientation = this.orientation

        for (let i = 0; i<ship.length; i++){
            if (ship.orientation == "v"){
                if (this.getCell(x,y+i) != "unset") return
            }
            if (ship.orientation == "h"){
                if (this.getCell(x+i,y) != "unset") return 
            }
            
        }

        for (let i = 0; i<ship.length; i++){
            if (ship.orientation == "v"){
                this.setCell(ship, x,y+i)                
            }
            if (ship.orientation == "h"){
                this.setCell(ship, x+i,y)
            }
            
        }
    }
}