import horizontalShipIcon from "../asset/ship.png";
import verticleShipIcon from "../asset/verticle_ship.png";

class DomController {
  constructor() {
    this.playerName = "player";
    this.cellClickCallback = undefined;
    this.displayedShipCallback = undefined;
    this.cellHoverCallback = undefined;
    this.playerGridMouseOutCallback = undefined;
    this.orientationChangeCallback = undefined;
    this.startBtnClickCallback = undefined;

    this.mainContainer = document.createElement("div");
    this.mainContainer.id = "main-container";

    document.body.appendChild(this.mainContainer);
  }

  renderTestPanel() {
    this.testPanel = document.createElement("div");
    this.testPanel.id = "test-panel";

    this.turnContainer = document.createElement("div");
    this.turnContainer.id = "turn-container";
    this.testPanel.appendChild(this.turnContainer);

    document.body.appendChild(this.testPanel);
  }

  displayTurn(turn) {
    this.turnContainer.textContent = turn;
  }

  assignCordinate(cell, cord) {
    cell.dataset.x = cord[0];
    cell.dataset.y = cord[1];
  }

  //create grid(name)
  createGameboard(name) {
    const height = 10;
    const width = 10;

    const gameboard = document.createElement("div");
    gameboard.id = `${name}-board`;
    gameboard.classList.add("gameboard");

    const grid = document.createElement("div");
    grid.id = `${name}-grid`;
    grid.classList.add("grid");
    grid.addEventListener("mouseout", this.playerGridMouseOutCallback);

    //render grid
    let x = 0;
    let y = 0;
    for (let i = 0; i < height * width; i++) {
      let newCell = document.createElement("div");
      newCell.classList.add("cell");

      //assign cordinate to cell

      grid.appendChild(newCell);

      if (x == width) {
        x = x - width;
        y = y + 1;
      }

      newCell.addEventListener("click", this.cellClickCallback);
      newCell.addEventListener("mousemove", this.cellHoverCallback);
      this.assignCordinate(newCell, [x, y]);

      x = x + 1;
    }

    gameboard.append(grid);
    this.mainContainer.appendChild(gameboard);
  }
  //placeShip(playerStr,shipObj)
  placeShip(player, shipObj) {
    const shipDiv = document.createElement("div");
    const shipImg = document.createElement("img");
    shipDiv.classList.add("ship");
    shipDiv.appendChild(shipImg);

    const x = shipObj.x + 1;
    const y = shipObj.y + 1;

    if (shipObj.orientation == "v") {
      shipImg.src = verticleShipIcon;
      shipDiv.style.gridRowStart = y;
      shipDiv.style.gridRowEnd = y + shipObj.length;

      shipDiv.style.gridColumnStart = x;
      shipDiv.style.gridColumnEnd = x;
    }
    if (shipObj.orientation == "h") {
      shipImg.src = horizontalShipIcon;

      shipDiv.style.gridRowStart = y;
      shipDiv.style.gridRowEnd = y;

      shipDiv.style.gridColumnStart = x;
      shipDiv.style.gridColumnEnd = x + shipObj.length;
    }

    document.querySelector(`#${player}-grid`).appendChild(shipDiv);
  }
  //renderBoard(playerObject)
  renderBoard(player) {
    this.removeSelectedCellShades();

    for (const [shipName, ship] of Object.entries(player.ships)) {
      this.placeShip(player.name, ship);
    }
  }

  markAsMissed(cell) {
    cell.classList.add("missed");
  }

  markAsHit(cell) {
    cell.classList.add("hit");
  }
  updateCell(cellObj, cell) {
    if (cellObj.ship == "unset") {
      this.markAsMissed(cell);
    } else {
      this.markAsHit(cell);
    }
  }

  getCellNode(cord) {
    return document.querySelector(
      `div[data-x="${cord[0]}"][data-y="${cord[1]}"]`,
    );
  }

  displayShip(start, ship, orientation) {
    const shipsContainer = document.getElementById("ships-container");

    const shipDiv = document.createElement("div");
    shipDiv.classList.add("ship");
    shipDiv.id = ship.name;
    shipDiv.dataset.size = ship.size;

    const shipImg = document.createElement("img");
    shipImg.addEventListener("click", this.displayedShipCallback);
    shipDiv.appendChild(shipImg);

    //make the ship stretch to desired size
    if (orientation == "v") {
      shipImg.src = verticleShipIcon;
      shipDiv.style.gridColumnStart = start;
      shipDiv.style.gridRowStart = 1;
      shipDiv.style.gridRowEnd = ship.size + 1;
    }
    if (orientation == "h") {
      shipImg.src = horizontalShipIcon;
      shipDiv.style.gridRowStart = start;
      shipDiv.style.gridColumnStart = 1;
      shipDiv.style.gridColumnEnd = ship.size + 1;
    }

    shipsContainer.appendChild(shipDiv);
  }

  removeShipFromDisplay(shipName) {
    const shipDiv = document.querySelector(`#${shipName}`);
    shipDiv.style.display = "none";
  }

  createStartMenu(playerName) {
    this.createGameboard(playerName);

    const startButtonContainer = document.createElement("div");
    startButtonContainer.id = "start-btn-container";

    const startButton = document.createElement("button");
    startButton.id = "start-btn";
    startButton.textContent = "ENTER GAME";
    startButton.addEventListener("click", this.startBtnClickCallback);

    startButtonContainer.appendChild(startButton);
    this.mainContainer.appendChild(startButtonContainer);

    const orientationBtnContainer = document.createElement("div");
    orientationBtnContainer.id = "orientation-btn-container";

    const orientationBtn = document.createElement("button");
    orientationBtn.id = "orientation-btn";
    orientationBtn.textContent = "Place on what axis?";
    orientationBtn.addEventListener("click", this.orientationChangeCallback);

    orientationBtnContainer.appendChild(orientationBtn);
    this.mainContainer.appendChild(orientationBtnContainer);

    const shipsContainer = document.createElement("div");
    shipsContainer.id = "ships-container";

    this.mainContainer.appendChild(shipsContainer);

    const shipsInfo = [
      { name: "carrier", size: 5 },
      { name: "battle", size: 4 },
      { name: "destroyer", size: 3 },
      { name: "submarine", size: 3 },
      { name: "patrol", size: 2 },
    ];
    //puts ships on display
    for (const [i, ship] of Object.entries(shipsInfo)) {
      this.displayShip(Number(i) + 1, ship, "v");
    }
  }

  selectShip(shipName) {
    const ship = document.querySelector(`#${shipName}`);
    //deselect if clicked twice
    if (ship.classList.contains("selected-ship")) {
      ship.classList.remove("selected-ship");
      return undefined;
    }

    const shipsContainer = document.querySelector("#ships-container");
    shipsContainer.childNodes.forEach((node) => {
      node.classList.remove("selected-ship");
    });

    ship.classList.add("selected-ship");
    return { name: ship.id, size: ship.dataset.size };
  }
  //{name, size}, [x,y]
  placeTempShip(ship, cord, orientation) {
    for (let i = 0; i < ship.size; i++) {
      let currCell = undefined;
      if (orientation == "v") {
        currCell = this.getCellNode([cord[0], cord[1] + i]);
      }
      if (orientation == "h") {
        currCell = this.getCellNode([cord[0] + i, cord[1]]);
      }

      currCell.classList.add("selected-cell");
    }
  }

  removeHighlights() {
    const playerGrid = document.querySelector(`#${this.playerName}-grid`);
    playerGrid.childNodes.forEach((node) => {
      if (node.classList.contains("highlighted"))
        node.classList.remove("highlighted");
    });
  }

  hoverShipPlacement(cell, size, orientation) {
    this.removeHighlights();
    for (let i = 0; i < size; i++) {
      let currCell = null;
      if (orientation == "v") {
        currCell = this.getCellNode([
          cell.dataset.x,
          Number(cell.dataset.y) + i,
        ]);
      }
      if (orientation == "h") {
        currCell = this.getCellNode([
          Number(cell.dataset.x) + i,
          cell.dataset.y,
        ]);
      }
      if (!currCell) return;
      currCell.classList.add("highlighted");
    }
  }

  isLegalPlacement(cell, size, orientation) {
    for (let i = 0; i < size; i++) {
      let currCell = null;
      if (orientation == "v") {
        currCell = this.getCellNode([
          cell.dataset.x,
          Number(cell.dataset.y) + i,
        ]);
      }
      if (orientation == "h") {
        currCell = this.getCellNode([
          Number(cell.dataset.x) + i,
          cell.dataset.y,
        ]);
      }
      if (!currCell) return false;
      if (currCell.classList.contains("selected-cell")) return false;
    }
  }

  changeOrientation(orientation) {
    let newOrientation = undefined;
    const orientationBtn = document.querySelector("#orientation-btn");

    if (orientation == "v") {
      orientationBtn.textContent = "Placing on X axis";
      newOrientation = "h";
    } else if (orientation == "h") {
      orientationBtn.textContent = "Placing on Y axis";
      newOrientation = "v";
    }
    return newOrientation;
  }

  removeSelectedCellShades() {
    const playerGrid = document.querySelector(`#${this.playerName}-grid`);
    playerGrid.childNodes.forEach((cell) => {
      if (cell.classList.contains("selected-cell")) {
        cell.classList.remove("selected-cell");
      }
    });
  }

  removeStartMenu() {
    const startBtnContainer = document.querySelector("#start-btn-container");
    this.mainContainer.removeChild(startBtnContainer);

    const orientation = document.querySelector("#orientation-btn-container");
    this.mainContainer.removeChild(orientation);

    const shipDisplay = document.querySelector("#ships-container");
    this.mainContainer.removeChild(shipDisplay);
  }
}

export default new DomController();
