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
  }px;`;
  gridBlock.style.cssText = gridStyle;
  gridBlock.classList.toggle("grid-block-active");
  GRID.appendChild(gridBlock);
}
// If you input an invalid command the browser just goes crazy trying to look for it
function createGrid(gridDivision) {
  clearGrid();
  for (let counter = 0; counter < gridDivision * gridDivision; counter++) {
    createGridBlock(gridDivision);
  }
  paintGrid();
}
createGrid(32);

function paintGrid() {
  const gridBlocks = document.querySelectorAll(".grid-block-active");
  gridBlocks.forEach((block) => {
    block.addEventListener("mousedown", () => {
      block.classList.toggle("grid-block-active");
      block.classList.toggle("grid-block-painted");
    });
  });
}

// function isPainted() {}
