import horizontalShipIcon from "../asset/ship.png"
import verticleShipIcon from "../asset/verticle_ship.png"

  //the turn should be indicated by text or change in border color

class DomController {
  constructor() {}

  renderTestPanel(){
    this.testPanel = document.createElement("div");
    this.testPanel.id = "test-panel"

    const turnContainer = document.createElement("div");
    turnContainer.id = "turn-container";
    this.testPanel.appendChild(turnContainer)

    document.body.appendChild(this.testPanel)

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
}

export default new DomController();
