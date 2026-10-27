import { Game } from "../modules/game.js";

test("turn changes after attack", () => {
  const newGame = new Game((test = true));

  //place ship
  expect(newGame.state.turn == "p").toBeTruthy();
  newGame.attackComputer([8, 2]);
  expect(newGame.state.turn == "c").toBeTruthy();
  expect(newGame.computer.ships["battle"].hits == 1);
});

test("game ends when one of players ships are all sunk", () => {
  const newGame = new Game((test = true));

  const board = newGame.player.board;
  const ships = board.ships;

  board.placeShip(ships["battle"], [1, 0]);
  board.placeShip(ships["submarine"], [2, 1]);
  board.placeShip(ships["carrier"], [3, 2]);
  board.placeShip(ships["destroyer"], [4, 3]);
  board.placeShip(ships["patrol"], [5, 4]);

  for (let [shipName, ship] of Object.entries(ships)) {
    for (let i = 0; i < ship.length; i++) {
      newGame.attackPlayer([ship.x, ship.y + i]);
    }
  }

  expect(newGame.isGameOver()).toBeTruthy();
});

test("game continues if all ships have not sunk ", () => {
  const newGame = new Game((test = true));

  const board = newGame.player.board;
  const ships = board.ships;

  board.placeShip(ships["battle"], [1, 0]);
  board.placeShip(ships["submarine"], [2, 1]);
  board.placeShip(ships["carrier"], [3, 2]);
  board.placeShip(ships["destroyer"], [4, 3]);
  board.placeShip(ships["patrol"], [5, 4]);

  for (let [shipName, ship] of Object.entries(ships)) {
    for (let i = 1; i < ship.length; i++) {
      newGame.attackPlayer([ship.x, ship.y + i]);
    }
  }

  expect(newGame.isGameOver()).not.toBeTruthy();
});

test("computer always has valid and random placements", () => {
  let foundUndefinedCordinate = false;
  for (let i = 0; i < 16; i++) {
    const newGame = new Game((test = true));
    newGame.placeComputerShips();
    const computerShips = newGame.computer.ships;

    for (const [shipName, shipObj] of Object.entries(computerShips)) {
      if (shipObj.x == undefined || shipObj.y == undefined)
        foundUndefinedCordinate = true;
    }
  }
  expect(foundUndefinedCordinate).toBeFalsy();
});
