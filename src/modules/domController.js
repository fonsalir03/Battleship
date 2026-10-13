import horizontalShipIcon from "../asset/ship.png"
import verticleShipIcon from "../asset/verticle_ship.png"

  //to figure out which cell was clicked
  //  cells will be numbered from 00-99
  //  get cell from cordinate -> concat x + y example: [0,5] = 05 = 5. [3,5] = 35. 
  //  get cordinate from cell -> 03 = [0,3]. 35 = [3,5]. 99 [9,9]

class DomController {
  constructor() {}

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
    for (let i = 0; i < height*width; i++){
      let newCell = document.createElement("div");
      newCell.classList.add("cell")
      grid.appendChild(newCell)
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
  //renderBoard(playerStr, ships)
  renderBoard(player, ships){
    for (const[shipName, ship] of Object.entries(ships)){
    this.placeShip(player, ship)
    }
  }
}

export default new DomController();
