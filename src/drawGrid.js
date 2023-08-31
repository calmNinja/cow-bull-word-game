const gameContainer = document.querySelector("#game-container");
const tilesGrid = document.querySelector(".tiles-grid");

export const state = {
  grid: [],
  currentRow: 0,
  currentTile: 0,
};
//Generate the word guessing grid
export const drawGrid = (wordLength, guesses) => {
  for (let i = 0; i < guesses; i++) {
    //Create a tile row
    const tileRow = document.createElement("div");
    tileRow.classList.add("tile-row");
    tileRow.setAttribute("id", `tileRow-${i + 1}`);
    //Create tiles
    const tileRowData = [];
    for (let j = 0; j < wordLength; j++) {
      const tile = document.createElement("div");
      tile.classList.add("tile");
      tile.setAttribute("id", `tile-${i}-${j}`);
      tileRow.appendChild(tile);
      //Initialize grid with empty values
      tileRowData.push("");
    }
    //Create Placeholders for cows and bulls
    const bullsElement = document.createElement("div");
    bullsElement.classList.add("bulls");

    const cowsElement = document.createElement("div");
    cowsElement.classList.add("cows");

    //Append placeholders to the Tile Row
    tileRow.appendChild(bullsElement);
    tileRow.appendChild(cowsElement);

    //Append tile Rows to the Tile Grid
    tilesGrid.appendChild(tileRow);

    // Add tile row data to the grid state
    state.grid.push(tileRowData);
  }

  //Append Tiles Grid to the Game Container
  gameContainer.appendChild(tilesGrid);
};
