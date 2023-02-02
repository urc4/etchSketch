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

function changeRandomColor() {
  const rainbowButton = document.querySelector(".rainbow-btn");
  rainbowButton.removeAttribute("id");
  const randomIndex = Math.floor(
    Math.random() * (COLOR_PALETTE.length - 0.00000001)
  );
  const randomColor = COLOR_PALETTE[randomIndex];
  rainbowButton.setAttribute("id", `${randomColor}`);
}

function getRandomColor() {
  const rainbowButton = document.querySelector(".rainbow-btn");
  return rainbowButton.id;
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

function paintBlock(block, color) {
  // const color = getColor();
  block.style.setProperty("--grid-block-color", color);

  if (isPainted(block)) return;

  block.classList.remove("inactive");
  block.classList.add("active");

  //create a current color variable
}

function toggleButtons(btnSelected) {
  const buttons = document.querySelectorAll(".btn");
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

function showNextClickDrag() {
  const clickDragButton = document.querySelector(".click-drag-btn");
  const clickDrag = clickDragButton.id;
  const textDiv = clickDragButton.querySelector(".text-btn");
  clickDragButton.removeAttribute("id");
  let nextClickDrag = clickDrag;
  if (clickDrag === "click") nextClickDrag = "drag";
  else nextClickDrag = "click";

  clickDragButton.setAttribute("id", `${nextClickDrag}`);
  textDiv.textContent = `${nextClickDrag}`;
}

function makeClickOrDrag(choice) {
  // const choice = document.querySelector(".click-drag-btn").id;
  const gridBlocks = document.querySelectorAll(".grid-block");

  if (choice === "click") {
    clickPaint(gridBlocks);
  } else if (choice === "drag") {
    dragPaint(gridBlocks);
  }
}

function dragPaint(gridBlocks) {
  let toggle = true;
  gridBlocks.forEach((block) => {
    block.addEventListener("mousedown", () => {
      toggle = !toggle;
      if (toggle) {
        block.addEventListener("mouseover", () => {
          const color = getColor();
          paintBlock(block, color);
        });
      }
    });
    //add mouse down and mouse over and click functionalities to paint individually and drag
  });
}

function clickPaint(gridBlocks) {
  gridBlocks.forEach((block) => {
    block.addEventListener("mousedown", () => {
      const color = getColor();
      paintBlock(block, color);
    });
    //add mouse down and mouse over and click functionalities to paint individually and drag
  });
}

function createClickDragButton() {
  const clickDragButton = document.querySelector(".grid-division-btn");
  clickDragButton.addEventListener("click", () => {
    selectButton(clickDragButton, showNextClickDrag);
    makeClickOrDrag(clickDragButton.id);
  });
}

function showNextGridDivision() {
  const gridButton = document.querySelector(".grid-division-btn");
  const clickDrag = Number(gridButton.id);
  const textDiv = gridButton.querySelector(".text-btn");
  gridButton.removeAttribute("id");
  let nextDivision = clickDrag;
  if (nextDivision + 16 > 100) nextDivision = 16;
  else nextDivision += 16;

  gridButton.setAttribute("id", `${nextDivision}`);
  textDiv.textContent = `${nextDivision}`;
}

//can make this fucntion take two argumetns gridBlocks and btnSelected and then new function to go
//isnide forEach
function createGridButton() {
  const gridButton = document.querySelector(".grid-division-btn");
  gridButton.addEventListener("click", () => {
    const textDiv = gridButton.querySelector(".text-btn");
    textDiv.textContent = gridButton.id;
    selectButton(gridButton, showNextGridDivision);
    createGrid(Number(gridButton.id));
  });
}

function displayClearGridButton() {
  const gridButton = document.querySelector(".grid-division-btn");
  if (!isSelected(gridButton)) {
    const textDiv = gridButton.querySelector(".text-btn");
    textDiv.textContent = `clear`;
  }
}

function paintGridButton() {
  const colorButton = document.querySelector(".color-btn");
  colorButton.addEventListener("click", () => {
    makeClickOrDrag();

    selectButton(colorButton, showNextColor); //if i put this one line above it just gets so freaknig random
    displayClearGridButton();
  });
}

function paintRandomButton() {
  const rainbowButton = document.querySelector(".rainbow-btn");
  rainbowButton.addEventListener("click", () => {
    const gridBlocks = document.querySelectorAll(".grid-block");
    gridBlocks.forEach((block) => {
      block.addEventListener("mousedown", () => {
        changeRandomColor();
        color = getRandomColor();
        paintBlock(block, color);
      });
      //add mouse down and mouse over and click functionalities to paint individually and drag
    });
    selectButton(rainbowButton, () => {}); //if i put this one line above it just gets so freaknig random
    displayClearGridButton();
  });
}

function eraseGridButton() {
  const eraserButton = document.querySelector(".eraser");
  eraserButton.addEventListener("click", () => {
    const gridBlocks = document.querySelectorAll(".grid-block");
    gridBlocks.forEach((block) => {
      block.addEventListener("mousedown", () => eraseBlock(block)); //just add an if statment here to toggle options
      //add mouse down and mouse over and click functionalities to paint individually and drag
    });
    selectButton(eraserButton, () => {});
    displayClearGridButton();
  });
}

createGrid(32);
// let gridBlocks = document.querySelectorAll(".grid-block");
paintGridButton();
eraseGridButton();
createGridButton();
paintRandomButton();
createClickDragButton();
// if ((gridBlocks = createGridButton())) {
//   paintGridButton();
//   eraseGridButton();
// }
