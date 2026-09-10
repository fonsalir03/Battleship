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
    expect(board.ships.some((ship)=> ship instanceof Carrier)).toBeTruthy()
    expect(board.ships.some((ship)=> ship instanceof Battleship)).toBeTruthy()
    expect(board.ships.some((ship)=> ship instanceof Destroyer)).toBeTruthy()
    expect(board.ships.some((ship)=> ship instanceof Submarine)).toBeTruthy()
    expect(board.ships.some((ship)=> ship instanceof PatrolBoat)).toBeTruthy()
})