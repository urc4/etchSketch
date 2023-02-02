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
  block.classList.remove("active");
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
  block.style.setProperty("--grid-block-color", color);

  if (isPainted(block)) return;

  block.classList.remove("inactive");
  block.classList.add("active");
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

function showNextGridDivision() {
  const gridButton = document.querySelector(".grid-division-btn");
  const gridDivision = Number(gridButton.id);
  const textDiv = gridButton.querySelector(".text-btn");
  gridButton.removeAttribute("id");
  let nextDivision = gridDivision;
  console.log(gridButton.id);
  if (nextDivision + 16 > 100) nextDivision = 16;
  else nextDivision += 16;

  gridButton.setAttribute("id", `${nextDivision}`);
  textDiv.textContent = `${nextDivision}`;
}

function createGridButton() {
  const gridButton = document.querySelector(".grid-division-btn");
  gridButton.addEventListener("mousedown", () => {
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

// function paintGridButton() {
//   const colorButton = document.querySelector(".color-btn");
//   colorButton.addEventListener("mousedown", () => {
//     const gridBlocks = document.querySelectorAll(".grid-block");
//     gridBlocks.forEach((block) => {
//       block.addEventListener("mousedown", () => {
//         const color = getColor();
//         paintBlock(block, color);
//       });
//     });
//     selectButton(colorButton, showNextColor);
//     displayClearGridButton();
//   });
// }

function paintGridButton() {
  const colorButton = document.querySelector(".color-btn");
  colorButton.addEventListener("mousedown", () => {
    const gridBlocks = document.querySelector(".grid");
    let mouseIsDown = false;

    gridBlocks.addEventListener("mousedown", (event) => {
      mouseIsDown = true;
      const color = getColor();
      paintBlock(event.target, color);
    });

    gridBlocks.addEventListener("mouseup", () => {
      mouseIsDown = false;
    });

    gridBlocks.addEventListener("mousemove", (event) => {
      if (mouseIsDown && event.target.matches(".grid-block")) {
        const color = getColor();
        paintBlock(event.target, color);
      }
    });

    selectButton(colorButton, showNextColor);
    displayClearGridButton();
  });
}

function paintRandomButton() {
  const rainbowButton = document.querySelector(".rainbow-btn");
  rainbowButton.addEventListener("mousedown", () => {
    const gridBlocks = document.querySelectorAll(".grid-block");
    gridBlocks.forEach((block) => {
      block.addEventListener("mousedown", () => {
        changeRandomColor();
        color = getRandomColor();
        paintBlock(block, color);
      });
    });
    selectButton(rainbowButton, () => {});
    displayClearGridButton();
  });
}

function eraseGridButton() {
  const eraserButton = document.querySelector(".eraser");
  eraserButton.addEventListener("mousedown", () => {
    const gridBlocks = document.querySelectorAll(".grid-block");
    gridBlocks.forEach((block) => {
      block.addEventListener("mousedown", () => eraseBlock(block));
    });
    selectButton(eraserButton, () => {});
    displayClearGridButton();
  });
}
createGrid(32);
paintGridButton();
eraseGridButton();
createGridButton();
paintRandomButton();
