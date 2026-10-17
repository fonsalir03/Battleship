import horizontalShipIcon from "../asset/ship.png"
import verticleShipIcon from "../asset/verticle_ship.png"

  //the turn should be indicated by text or change in border color

class DomController {
  constructor() {
    this.cellClickCallback = undefined
  }

  renderTestPanel(){
    this.testPanel = document.createElement("div");
    this.testPanel.id = "test-panel"

    this.turnContainer = document.createElement("div");
    this.turnContainer.id = "turn-container";
    this.testPanel.appendChild(this.turnContainer)

    document.body.appendChild(this.testPanel)

  }

  displayTurn(turn){
    
    this.turnContainer.textContent = turn

  }

  assignCordinate(cell,cord){
    cell.dataset.x = cord[0]
    cell.dataset.y = cord[1]
  }

  //create grid(name)
  createGameboard(name) {
    const height = 10
    const width = 10

    const gameboard = document.createElement("div");
    gameboard.id = `${name}-board`;
    gameboard.classList.add("gameboard");
    
    const grid = document.createElement("div")
    grid.id = `${name}-board`;
    grid.classList.add("grid")

    //render grid
    let x = 0
    let y = 0
    for (let i = 0; i < height*width; i++){
      let newCell = document.createElement("div");
      newCell.classList.add("cell")

      //assign cordinate to cell

      grid.appendChild(newCell)

      if (x==width){
        x = x - width
        y = y + 1
      }

      newCell.addEventListener("click", this.cellClickCallback)
      this.assignCordinate(newCell, [x,y])

      x = x + 1
    }

    gameboard.append(grid)
    document.body.appendChild(gameboard);
  }
  //placeShip(playerStr,shipObj)
  placeShip(player, shipObj){
    const shipDiv = document.createElement("div")
    const shipImg = document.createElement("img")
    shipDiv.classList.add("ship")
    shipDiv.appendChild(shipImg)

    const x = shipObj.x + 1
    const y = shipObj.y + 1

    if (shipObj.orientation == "v"){
      shipImg.src = verticleShipIcon
      shipDiv.style.gridRowStart = y
      shipDiv.style.gridRowEnd = y + shipObj.length

      shipDiv.style.gridColumnStart = x
      shipDiv.style.gridColumnEnd = x


    }
    if (shipObj.orientation == "h"){
      shipImg.src = horizontalShipIcon

      shipDiv.style.gridRowStart = y
      shipDiv.style.gridRowEnd = y

      shipDiv.style.gridColumnStart = x
      shipDiv.style.gridColumnEnd = x + shipObj.length
    }

    document.querySelector(`#${player}-board`).appendChild(shipDiv)
    
  }
  //renderBoard(playerObject)
  renderBoard(player){
    for (const[shipName, ship] of Object.entries(player.ships)){
    this.placeShip(player.name, ship)
    }
  }

  markAsMissed(cell){
    cell.classList.add("missed")
  }

  markAsHit(cell){
    cell.classList.add("hit")
  }
  updateCell(cellObj, cell){
    if (cellObj.ship == "unset"){
      this.markAsMissed(cell)
    }else{
      this.markAsHit(cell)
    }
  }

  getCellNode(cord){
    return document.querySelector(`div[data-x="${cord[0]}"][data-y="${cord[1]}"]`)
  }
}

export default new DomController();
