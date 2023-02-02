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

function removeGrid() {
  while (GRID.firstChild) {
    GRID.removeChild(GRID.firstChild);
  }
}

function eraseBlock(block) {
  if (!isPainted(block)) return;
  block.classList.remove("active"); //toggle gets confusing with lots of elemetns
  block.classList.add("inactive");
}

function eraseGrid() {
  let block = document.querySelector(".grid-block");
  while (block) {
    eraseBlock(block);
    block = block.nextSibling;
  }
}

function createBlock(gridDivison) {
  const gridBlock = document.createElement("div");
  const blockStyle = `height: ${LENGTH / gridDivison}px; width: ${
    LENGTH / gridDivison
  }px;`;
  gridBlock.style.cssText = blockStyle;
  gridBlock.classList.add("grid-block");
  gridBlock.classList.add("inactive");
  GRID.appendChild(gridBlock);
}

function createGrid(gridDivision) {
  removeGrid();
  for (let counter = 0; counter < gridDivision * gridDivision; counter++) {
    createBlock(gridDivision);
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
  const color = getColor();
  block.style.setProperty("--grid-block-color", color);

  if (isPainted(block)) return;

  block.classList.remove("inactive");
  block.classList.add("active");

  //create a current color variable
}

function toggleButtons(btnSelected) {
  const buttons = document.querySelectorAll(".btn-circle");
  buttons.forEach((button) => {
    if (isSelected(button)) button.classList.remove("selected");
  });
  btnSelected.classList.add("selected");
}

function isSelected(button) {
  return button.classList.contains("selected");
}

function selectButton(btnSelected, showNext) {
  const selected = isSelected(btnSelected);
  if (!selected) {
    toggleButtons(btnSelected);
    return;
  }
  showNext();
}

function paintGridButton() {
  const gridBlocks = document.querySelectorAll(".grid-block");
  const colorButton = document.querySelector(".color-btn");
  colorButton.addEventListener("click", () => {
    gridBlocks.forEach((block) => {
      block.addEventListener("mousedown", () => paintBlock(block));
      //add mouse down and mouse over and click functionalities to paint individually and drag
    });
    selectButton(colorButton, showNextColor);
  });
}

function eraseGridButton() {
  const gridBlocks = document.querySelectorAll(".grid-block");
  const eraserButton = document.querySelector(".eraser");
  eraserButton.addEventListener("click", () => {
    gridBlocks.forEach((block) => {
      block.addEventListener("mousedown", () => eraseBlock(block)); //just add an if statment here to toggle options
      //add mouse down and mouse over and click functionalities to paint individually and drag
    });
    selectButton(eraserButton, () => {});
  });
}

createGrid(32);
paintGridButton(); //here goes the options when selected
eraseGridButton();
