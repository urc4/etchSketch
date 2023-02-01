const GRID = document.querySelector(".grid");
const LENGTH = GRID.offsetWidth;

function eraseGrid() {
  //there is childNodes[0]
  while (GRID.firstChild) {
    GRID.removeChild(GRID.firstChild);
  }
}

function clearGrid() {
  let block = document.querySelector(".grid-block");
  while (block) {
    block.classList.toggle("active");
    block.classList.toggle("inactive");
    block = block.nextSibling;
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
  eraseGrid();
  for (let counter = 0; counter < gridDivision * gridDivision; counter++) {
    createGridBlock(gridDivision);
  }
  paintGrid();
}

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

function clearBlock(block) {
  if (!isPainted(block)) return;
  block.classList.toggle("active");
  block.classList.toggle("inactive");
}

function paintBlock(block) {
  //could a paint white option to be the eraser
  const color = getColor();
  block.style.setProperty("--grid-block-color", color);

  if (isPainted(block)) return;

  block.classList.toggle("inactive");
  block.classList.toggle("active");

  //create a current color variable
}

function paintGrid() {
  const gridBlocks = document.querySelectorAll(".grid-block");
  gridBlocks.forEach((block) => {
    block.addEventListener("mousedown", () => paintBlock(block));
    //add mouse down and mouse over and click functionalities to paint individually and drag
  });
}

createGrid(30);
