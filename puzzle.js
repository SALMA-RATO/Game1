
const ROWS = 2;
const COLUMNS = 2;

// Variables
let currTile;
let otherTile;
let turns = 0;
let pieces = [];
let targetPositions = [];

// Function to create a tile element
function createTile(src) {
  const tile = document.createElement("img");
  tile.src = src;
  tile.addEventListener("dragstart", dragStart);
  tile.addEventListener("dragover", dragOver);
  tile.addEventListener("dragenter", dragEnter);
  tile.addEventListener("dragleave", dragLeave);
  tile.addEventListener("drop", dragDrop);
  tile.addEventListener("dragend", dragEnd);
  return tile;
}

// Function to generate puzzle pieces
function generatePieces() {
  for (let i = 1; i <= 4; i++) {
    pieces.push(i.toString());
  }
  pieces.reverse();
  for (let i = 0; i < pieces.length; i++) {
    let j = Math.floor(Math.random() * pieces.length);
    let tmp = pieces[i];
    pieces[i] = pieces[j];
    pieces[j] = tmp;
  }
}

// Function to create the puzzle board
function createBoard() {
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLUMNS; c++) {
      const tile = createTile("");
      document.getElementById("board").append(tile);
    }
  }
}

// Function to create the puzzle pieces container
function createPiecesContainer() {
  for (let i = 0; i < pieces.length; i++) {
    const tile = createTile(`./images/${pieces[i]}.jpg`);
    document.getElementById("pieces").append(tile);
  }
}

// Drag and drop functionality
function dragStart() {
  currTile = this;
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
}

function dragLeave() {}

function dragDrop() {
  otherTile = this;
}

function dragEnd() {
  if (currTile.src.includes("blank")) {
    return;
  }
  let currImg = currTile.src;
  let otherImg = otherTile.src;
  currTile.src = otherImg;
  otherTile.src = currImg;
  turns += 1;
  document.getElementById("turns").innerText = turns;
}

// Function to check if the puzzle is solved
function checkSolved() {
  let solved = true;
  for (let i = 0; i < pieces.length; i++) {
    if (pieces[i].style.left !== targetPositions[i].left || pieces[i].style.top !== targetPositions[i].top) {
      solved = false;
      break;
    }
  }
  return solved;
}

// Function to handle puzzle completion
function puzzleComplete() {
  if (checkSolved()) {
    alert("Congratulations! You solved the puzzle!");
    document.getElementById("board").innerHTML = "<h2 class='congratulations'>Congratulations! You solved the puzzle!</h2>"; 
    anime({
      targets: '.congratulations',
      translateX: 100,
      translateY: 100,
      rotate: 360,
      duration: 2000,
      easing: 'easeInOut',
      complete: function() {
        console.log('Festival animation complete!');
      }
    });
  }
}

// Initialize the puzzle
window.onload = function() {
  generatePieces();
  createBoard();
  createPiecesContainer();
};

// Call the checkSolved function after each piece is moved
pieces.forEach(piece => {
  piece.addEventListener("click", function() {
    puzzleComplete(); 
  });
});
