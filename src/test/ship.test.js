import { Carrier, Battleship, PatrolBoat } from "../modules/ship.js";

test("Carrier ship has a length of 5", () => {
  const ship = new Carrier();
  expect(ship.length).toBe(5);
});

test("Battleship reports three hits when hit thrice", () => {
  const ship = new Battleship();

  ship.hit();
  ship.hit();
  ship.hit();

  expect(ship.hits).toBe(3);
});

test("Patrol Boat sinks when hit twice", () => {
  const ship = new PatrolBoat();

  ship.hit();
  ship.hit();

  expect(ship.isSunk()).toBeTruthy();
});
