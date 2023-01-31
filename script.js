const GRID = document.querySelector(".grid");
const LENGTH = GRID.offsetWidth;

function clearGrid() {
  //there is childNodes[0]
  while (GRID.firstChild) {
    GRID.removeChild(GRID.firstChild);
  }
}

function createGridBlock(gridDivison) {
  const gridBlock = document.createElement("div");
  const gridStyle = `height: ${LENGTH / gridDivison}px; width: ${
    LENGTH / gridDivison
  }px; background-color:black;`;
  gridBlock.style.cssText = gridStyle;
  gridBlock.classList.toggle(".gridBlock");
  GRID.appendChild(gridBlock);
}
//taking too long bc didnt include units px after number and it was remove instead of removeChild
// when i reload page it just stops now its better wtf
function createGrid(gridDivision) {
  clearGrid();
  for (let counter = 0; counter < gridDivision * gridDivision; counter++) {
    createGridBlock(gridDivision);
  }
}
createGrid(64);
