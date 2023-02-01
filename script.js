const GRID = document.querySelector(".grid");
const LENGTH = GRID.offsetWidth;
const COLOR_PALETTE = [
  "red",
  "yellow",
  "orange",
  "green",
  "blue",
  "indigo",
  "violet",
];

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
  const colorButton = document.querySelector(".color-btn");
  return colorButton.id;
}

function getNextColor() {
  const colorButton = document.querySelector(".color-btn");
  const colorID = colorButton.id;
  const paletteLength = COLOR_PALETTE.length;
  const idIndex = COLOR_PALETTE.indexOf(colorID);
  let nextColor;
  idIndex === paletteLength
    ? (nextColor = COLOR_PALETTE[0])
    : (nextColor = COLOR_PALETTE[idIndex + 1]);

  colorButton.style.setProperty("--btn-color-bground", COLOR_PALETTE[0]);
  console.log(COLOR_PALETTE[idIndex + 1]);
  return nextColor;

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
