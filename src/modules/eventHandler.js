import { Game } from "./game.js";
import domController from "./domController.js";

class eventHandler {
  constructor() {
    document.addEventListener("DOMContentLoaded", () => {
      //add callback to cell click
      domController.cellClickCallback = this.handleCellClick;
      domController.displayedShipCallback = this.handleDisplayedShipClick;
      domController.cellHoverCallback = this.handleCellHover;
      domController.playerGridMouseOutCallback = this.handlePlayerGridMouseOut;
      domController.orientationChangeCallback =
        this.handleOrientationChangeBtnPress;
      domController.startBtnClickCallback = this.handleStartBtnClick;

      this.selectedShip = undefined;
      this.legalPlacement = undefined;
      this.orientation = "v";
      this.placedShips = {};

      this.playerName = "player";
      domController.playerName = "player";

      this.initStartMenu(this.playerName);
    });
  }

  grabCordinate(node) {
    return [Number(node.target.dataset.x), Number(node.target.dataset.y)];
  }

  handleCellClick = (node) => {
    const cord = this.grabCordinate(node);
    const boardId = node.target.parentElement.id;

    //in start menu
    if (boardId == `${this.playerName}-grid` && this.game == undefined) {
      if (this.selectedShip && this.legalPlacement != false) {
        domController.placeTempShip(
          this.selectedShip,
          [Number(node.target.dataset.x), Number(node.target.dataset.y)],
          this.orientation,
        );
        //log the placement
        this.placedShips[this.selectedShip.name] = {
          orientation: this.orientation,
          cord: cord,
        };
        domController.removeShipFromDisplay(this.selectedShip.name);
        this.selectedShip = undefined;
      }
    }

    //in game
    if (boardId == "computer-grid" && this.game.isGameOver() == false) {
      //get cell location from gameboard
      const computerCell = this.computer.board.getCell(cord[0], cord[1]);
      if (computerCell.attacked) return;

      const counterAttack = this.game.attackComputer(cord);
      const playerCell = this.player.board.getCell(
        counterAttack[0],
        counterAttack[1],
      );
      const playerCellNode = domController.getCellNode(counterAttack);

      domController.updateCell(computerCell, node.target);
      domController.updateCell(playerCell, playerCellNode);

      if (this.game.isGameOver() == true) {
        //handle endgame
        alert("Game Over!");
      }
    }
  };

  initGame(shipPlacements) {
    this.game = new Game(shipPlacements);
    this.player = this.game.player;
    this.player.name = this.playerName;
    this.computer = this.game.computer;

    domController.removeStartMenu();
    domController.renderBoard(this.player);

    domController.createGameboard("computer");
  }

  initStartMenu(playerName) {
    domController.createStartMenu(playerName);
  }

  handleDisplayedShipClick = (node) => {
    const shipName = node.target.parentElement.id;
    this.selectedShip = domController.selectShip(shipName);
  };

  handleCellHover = (node) => {
    if (!this.selectedShip) return;
    this.legalPlacement = domController.isLegalPlacement(
      node.target,
      this.selectedShip.size,
      this.orientation,
    );
    domController.hoverShipPlacement(
      node.target,
      this.selectedShip.size,
      this.orientation,
    );
  };

  handlePlayerGridMouseOut = () => {
    domController.removeHighlights();
  };

  handleOrientationChangeBtnPress = () => {
    this.orientation = domController.changeOrientation(this.orientation);
  };

  handleStartBtnClick = () => {
    if (Object.keys(this.placedShips).length != 5) {
      alert("Place all ships before entering game!");
      return;
    }
    this.initGame(this.placedShips);
  };
}

export default new eventHandler();
