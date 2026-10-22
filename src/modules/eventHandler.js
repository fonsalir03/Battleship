import { Game } from "./game.js";
import domController from "./domController.js";

class eventHandler {
  
  constructor(){
    document.addEventListener("DOMContentLoaded", ()=>{
      //add callback to cell click
      domController.cellClickCallback = this.handleCellClick
      domController.displayedShipCallback = this.handleDisplayedShipClick
      domController.cellHoverCallback = this.handleCellHover
      domController.playerGridMouseOutCallback = this.handlePlayerGridMouseOut

      this.playerName = "player"
      domController.playerName = "player"
      
      this.initStartMenu(this.playerName)
      //track selected ship
      this.selectedShip = undefined
      this.legalPlacement = undefined
      //listen for change in orientation
      //listen for request of ship placement
      //once the required input is gatherd ([x,y],name,orientation) it can be stored in an object
      //  once that object is filled, start button will listen for input
      //  see psuedocode in game module for next steps
      //this.initGame(shipPlacements)
    
    })
  }

  grabCordinate(node){return [Number(node.target.dataset.x), Number(node.target.dataset.y)]}


  handleCellClick = (node)=>{

    const cord = this.grabCordinate(node)
    const boardId = node.target.parentElement.id

    //in start menu
    if (boardId==`${this.playerName}-grid` && this.game == undefined) {
      if (this.selectedShip && this.legalPlacement!= false){
        domController.placeTempShip(this.selectedShip, [Number(node.target.dataset.x), Number(node.target.dataset.y)], "h")
        domController.removeShipFromDisplay(this.selectedShip.name)
        this.selectedShip = undefined
      }
    }

    //in game
    if (boardId=="computer-grid" && this.game.isGameOver()==false){
      //get cell location from gameboard
      const computerCell = this.computer.board.getCell(cord[0],cord[1])
      if (computerCell.attacked) return

      const counterAttack = this.game.attackComputer(cord)
      const playerCell = this.player.board.getCell(counterAttack[0], counterAttack[1])
      const playerCellNode = domController.getCellNode(counterAttack)

      domController.updateCell(computerCell, node.target )
      domController.updateCell(playerCell,playerCellNode)

      if (this.game.isGameOver()==true) {
        //handle endgame
        alert("Game Over!")
      }
    }
  }

  initGame(){

      this.game = new Game(true);
      this.player = this.game.player
      this.player.name = this.playerName
      this.computer = this.game.computer

      domController.renderBoard(this.player);

      domController.createGameboard("computer");
      

  }

  initStartMenu(playerName){
    domController.createStartMenu(playerName)
  }

  handleDisplayedShipClick = (node)=>{
    const shipName = node.target.parentElement.id
    this.selectedShip = domController.selectShip(shipName)
    console.log(this.selectedShip)
  }

  handleCellHover = (node)=>{
    //console.log(node.target)
    if (!this.selectedShip) return
    this.legalPlacement = domController.isLegalPlacement(node.target, this.selectedShip.size, "h")
    domController.hoverShipPlacement(node.target,this.selectedShip.size, "h")
    console.log(this.legalPlacement)
  }

  handlePlayerGridMouseOut = ()=>{
    domController.removeHighlights()
  }

}

export default new eventHandler