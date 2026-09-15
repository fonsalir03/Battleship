import { Gameboard } from "../modules/gameboard.js";
import {Carrier, Battleship, Destroyer, Submarine, PatrolBoat} from "../modules/ship.js"

test("gameboard has 10 rows", ()=>{
    const board = new Gameboard
    expect(board.grid.length).toBe(10)
})

test("gameboard has 10 columns", ()=>{
    const board = new Gameboard
    expect(board.grid[0].length).toBe(10)
    expect(board.grid[9].length).toBe(10)
})
test("each ship type is defined", ()=>{
    const board = new Gameboard
    expect(board.ships["carrier"] instanceof Carrier).toBeTruthy()
    expect(board.ships["battle"] instanceof Battleship).toBeTruthy()
    expect(board.ships["destroyer"] instanceof Destroyer).toBeTruthy()
    expect(board.ships["submarine"] instanceof Submarine).toBeTruthy()
    expect(board.ships["patrol"] instanceof PatrolBoat).toBeTruthy()
})
test("the grid holds destroyer in verticle orientation", ()=>{
    const board = new Gameboard
    board.orientation = "v"

    //place patroal head at 33 with verticle orientation
    board.placeShip(board.ships["patrol"], [3,3])
    expect(board.getCell(3,2) == "unset").toBeTruthy()
    expect(board.getCell(3,3) == board.ships["patrol"]).toBeTruthy()
    expect(board.getCell(3,4) == board.ships["patrol"]).toBeTruthy()
    expect(board.getCell(3,5) == "unset").toBeTruthy()

})

test("the grid holds destroyer in horizontal orientation", ()=>{
    const board = new Gameboard
    board.orientation = "h"

    //place destroyer head at 00 with horizontal orientation
    board.placeShip(board.ships["destroyer"], [0,0])
    expect(board.getCell(0,0) == board.ships["destroyer"]).toBeTruthy()
    expect(board.getCell(1,0) == board.ships["destroyer"]).toBeTruthy()
    expect(board.getCell(2,0) == board.ships["destroyer"]).toBeTruthy()
    expect(board.getCell(3,0) == "unset").toBeTruthy()

})

test("gameboard will not place a ship if it overrides another", ()=>{
    const board = new Gameboard
    board.orientation = "h"

    board.placeShip(board.ships["submarine"], [4,4])
    board.placeShip(board.ships["carrier"], [5,4])
    board.orientation = "v"
    board.placeShip(board.ships["battle"], [5,3])

    // [4,4]-[6,4] should be submarine
    expect(board.getCell(4,4)==board.ships["submarine"]).toBeTruthy()
    expect(board.getCell(5,4)==board.ships["submarine"]).toBeTruthy()
    expect(board.getCell(6,4)==board.ships["submarine"]).toBeTruthy()

    // [7,4]-[10,4] should not have carrier
    expect(board.getCell(7,4)=="unset").toBeTruthy()
    expect(board.getCell(8,4)=="unset").toBeTruthy()
    expect(board.getCell(9,4)=="unset").toBeTruthy()

    // [5,3], [5,5] and [5,6] should not have battleship
    expect(board.getCell(5,3)=="unset").toBeTruthy()
    expect(board.getCell(5,5)=="unset").toBeTruthy()
    expect(board.getCell(5,6)=="unset").toBeTruthy()

})

test("gameboard will not place a ship that goes out of bounds", ()=>{
    const board = new Gameboard

    board.orientation = "h"
    board.placeShip(board.ships["destroyer"], [9,0])

    board.orientation = "v"
    board.placeShip(board.ships["carrier"], [0,9])

    expect(board.getCell(9,0)=="unset").toBeTruthy()
    expect(board.getCell(0,9)=="unset").toBeTruthy()

})