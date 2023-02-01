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
  gridBlock.classList.toggle("grid-block");
  gridBlock.classList.toggle("inactive");
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
//if you leave a function with an empty statement it just does not stop runnnig
// or should it return undefined??

function getColor() {
  //has to be a string

  return "green";
  //add eventlistners to buttons later on
}

function isPainted(gridBlock) {
  const painted = gridBlock.classList.contains("active");
  if (painted) return true;
  return false;
}

function paintBlock(block) {
  const color = getColor();
  block.style.setProperty("--grid-block-color", color);

  if (isPainted(block)) return;

  block.classList.toggle("inactive");
  block.classList.toggle("active");

  //create a current color variable

  // block.style.backgroundColor = "yellow";
  // block.style.cssText = "background-color:pink;"; why does it not work inline js has higher specificty
}

function paintGrid() {
  const gridBlocks = document.querySelectorAll(".grid-block");
  gridBlocks.forEach((block) => {
    block.addEventListener("mousedown", () => paintBlock(block));
    //add mouse down and mouse over and click functionalities to paint individually and drag
  });
}

// function isPainted() {}
