class DomController {
  constructor() {}

  //create grid(name)
  createGameboard(name) {
    //parent container set to grid
    const gameboard = document.createElement("div");
    gameboard.id = name;
    gameboard.classList.add("gameboard");
    //child rows
    for (let rowNum = 0; rowNum < 10; rowNum++) {
      let row = document.createElement("div");
      row.classList.add("row");
      row.dataset.row = rowNum;

      for (let cellNum = 0; cellNum < 10; cellNum++) {
        let cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.cell = cellNum;
        row.appendChild(cell);
      }
      gameboard.appendChild(row);
    }
    //  child colums
    document.body.appendChild(gameboard);
  }
}

export default new DomController();
