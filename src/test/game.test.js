import { Game } from "../modules/game.js";

test("turn changes after attack", ()=>{
    const newGame = new Game(test=true)

    //place ship
    expect(newGame.turn == "p").toBeTruthy()
    newGame.attackComputer([8,2])
    expect(newGame.turn == "c").toBeTruthy()
    expect(newGame.computer.ships["battle"].hits == 1)
})

test("game ends when one of players ships are all sunk", ()=> {

    const newGame = new Game(test=true)
    const playerShips = newGame.player.ships

    for (let [shipName, ship] of Object.entries(playerShips)) {
        for (let i = 0; i < ship.length; i++) {
            newGame.attackPlayer([ship.x, ship.y+i])
        }
    }

    expect(newGame.isGameOver()).toBeTruthy()

})

test("game continues if all ships have not sunk ", ()=> {

    const newGame = new Game(test=true)
    const playerShips = newGame.player.ships

    for (let [shipName, ship] of Object.entries(playerShips)) {
        for (let i = 1; i < ship.length; i++) {
            newGame.attackPlayer([ship.x, ship.y+i])
        }
    }

    expect(newGame.isGameOver()).not.toBeTruthy()
})