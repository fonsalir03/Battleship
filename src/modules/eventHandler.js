import { Game } from "./game.js";
import domController from "./domController.js";

class eventHandler {
  
  constructor(){
    document.addEventListener("DOMContentLoaded", ()=>{

      this.initDOM()

    })
  }

  grabCordinate(node){return [Number(node.target.dataset.x), Number(node.target.dataset.y)]}


  handleCellClick = (node)=>{

    const gameState = this.game.isGameOver()
    const cord = this.grabCordinate(node)
    const boardId = node.target.parentElement.id


    if (boardId=="player-board") {
      console.log("player board")
    }

    if (boardId=="computer-board" && gameState==false){
      //get cell location from gameboard
      const computerCell = this.computer.board.getCell(cord[0],cord[1])
      if (computerCell.attacked) return

      const counterAttack = this.game.attackComputer(cord)
      const playerCell = this.player.board.getCell(counterAttack[0], counterAttack[1])
      const playerCellNode = domController.getCellNode(counterAttack)

      domController.updateCell(computerCell, node.target )
      domController.updateCell(playerCell,playerCellNode)
    }
  }

  initDOM(){

      this.game = new Game(true);
      this.player = this.game.player
      this.computer = this.game.computer

      domController.cellClickCallback = this.handleCellClick

      domController.createGameboard(this.player.name);
      domController.renderBoard(this.player);

      domController.createGameboard("computer");
      
      domController.renderTestPanel();

  }
}

export default new eventHandler