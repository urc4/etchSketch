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
const SECONDARY_COLOR_PALETTE = [
  "lightcoral",
  "lightyellow",
  "lightsalmon",
  "lightseagreen",
  "lightblue",
  "lightskyblue",
  "lightpink",
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

function showNextColor() {
  const colorButton = document.querySelector(".color-btn");
  const colorID = colorButton.id;
  const paletteLength = COLOR_PALETTE.length;
  const idIndex = COLOR_PALETTE.indexOf(colorID);
  colorButton.removeAttribute("id");
  let nextColor;

  if (idIndex === paletteLength - 1) {
    nextColor = COLOR_PALETTE[0];
    nextSecondaryColor = SECONDARY_COLOR_PALETTE[0];
  } else {
    nextColor = COLOR_PALETTE[idIndex + 1];
    nextSecondaryColor = SECONDARY_COLOR_PALETTE[idIndex + 1];
  }
  colorButton.id = nextColor;
  colorButton.style.setProperty("--primary-btn-bg-color", nextColor);
  colorButton.style.setProperty("--secondary-btn-bg-color", nextSecondaryColor);
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
  const colorButton = document.querySelector(".color-btn");
  const eraserButton = document.querySelector(".eraser");
  colorButton.addEventListener("click", () => {
    const isSelected = colorButton.classList.contains("selected");
    if (isSelected) {
      showNextColor();
    } else {
      colorButton.classList.toggle("selected");
      eraserButton.classList.toggle("selected");
    }
  });
  eraserButton.addEventListener("click", () => {
    const isSelected = eraserButton.classList.contains("selected");
    if (isSelected) {
      console.log("hi");
    } else {
      colorButton.classList.toggle("selected");
      eraserButton.classList.toggle("selected");
    }
  });
  gridBlocks.forEach((block) => {
    block.addEventListener("mousedown", () => paintBlock(block));
    //add mouse down and mouse over and click functionalities to paint individually and drag
  });
}

createGrid(20);
