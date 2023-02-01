const GRID = document.querySelector(".grid");
const LENGTH = GRID.offsetWidth;

function eraseGrid() {
  while (GRID.firstChild) {
    GRID.removeChild(GRID.firstChild);
  }
}
function createBlock(gridDivison) {
  const gridBlock = document.createElement("div");
  const blockStyle = `height: ${LENGTH / gridDivison}px; width: ${
    LENGTH / gridDivison
  }px;`;
  gridBlock.style.cssText = blockStyle;
  gridBlock.classList.toggle("grid-block");
  gridBlock.classList.toggle("inactive");
  GRID.appendChild(gridBlock);
}

function createGrid(gridDivision) {
  eraseGrid();
  for (let counter = 0; counter < gridDivision * gridDivision; counter++) {
    createBlock(gridDivision);
  }
  getColor();
  paintGrid();
}

function clearBlock(block) {
  if (!isPainted(block)) return;
  block.classList.toggle("active");
  block.classList.toggle("inactive");
}

function clearGrid() {
  let block = document.querySelector(".grid-block");
  while (block) {
    clearBlock(block);
    block = block.nextSibling;
  }
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
