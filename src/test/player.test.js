import { Computer, Player } from "../modules/player";
import { Gameboard } from "../modules/gameboard";

function onlyUnique(value, index, array) {
  return array.indexOf(value) === index;
}

test("player has gameboard", () => {
  const player = new Player();
  expect(player.board instanceof Gameboard).toBeTruthy();
});
test("computer has gameboard", () => {
  const computer = new Computer();
  expect(computer.board instanceof Gameboard).toBeTruthy();
});
test("computer can choose a random cordinate within the bounds of the grid", () => {
  const cpu = new Computer();
  const randomCordinate = cpu.randomCordinate();
  const x = randomCordinate[0];
  const y = randomCordinate[1];

  expect(y >= 0 && y <= 9).toBeTruthy();
  expect(x >= 0 && x <= 9).toBeTruthy();
});
test("computer wont choose the same cordinate twice", () => {
  const cpu = new Computer();

  const convertedValues = [];
  for (let i = 0; i < cpu.board.width * cpu.board.height; i++) {
    let cord = cpu.randomCordinate();
    //convert cordinate to single number
    convertedValues.push(String(cord[0]) + String(cord[1]));
  }

  const unique = convertedValues.filter(onlyUnique);

  expect(convertedValues.length == unique.length).toBeTruthy();
});
