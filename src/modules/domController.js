import horizontalShipIcon from "../asset/ship.png"
import verticleShipIcon from "../asset/verticle_ship.png"

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
}

export default new DomController();
