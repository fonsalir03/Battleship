import {Computer, Player} from "../modules/player";
import { Gameboard } from "../modules/gameboard";

test("player has gameboard", ()=> {
    const player = new Player
    expect(player.board instanceof Gameboard).toBeTruthy()
})
test.skip("computer has gameboard", ()=> {
    const computer = new Computer
    expect(computer.board instanceof Gameboard).toBeTruthy()
})