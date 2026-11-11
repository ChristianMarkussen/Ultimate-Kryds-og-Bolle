let boards = [];
let currentPlayer = "X";
let smallBoardWins = [null, null, null, null, null, null, null, null, null];
let activeBoard = null;

for (let i = 0; i < 9; i++) {
  boards.push([null, null, null, null, null, null, null, null, null]);
}

const gameBoard = document.querySelector("#game-board");

for (let i = 0; i < 9; i++) {
  const smallBoard = document.createElement("div");

  smallBoard.classList.add("small-board");
  smallBoard.dataset.board = i;

  for (let j = 0; j < 9; j++) {
    const button = document.createElement("button"); //Laver knap
    button.classList.add("cell"); //Tilføjer class "cell"
    button.dataset.cell = j; //Giver knap data-cell = celle index
    smallBoard.appendChild(button); //Gør knappe til child af smallBoard
  }
  gameBoard.appendChild(smallBoard);
}

gameBoard.addEventListener("click", function (event) {
  button = event.target;

  const boardIndex = Number(button.parentElement.dataset.board);
  const cellIndex = Number(button.dataset.cell);
  console.log(boardIndex, cellIndex);

  if (isValidMove(boardIndex, cellIndex)) {
    resetActiveBoard();
    placePiece(boardIndex, cellIndex);
    setSmallBoardWin(boardIndex);
    showActiveBoard();
    alertWinner();
    changePlayer();
  }
});

function changePlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function isValidMove(boardIndex, cellIndex) {
  return (
    boards[boardIndex][cellIndex] === null &&
    smallBoardWins[boardIndex] === null &&
    activeBoardCheck(boardIndex)
  );
}

function checkSmallBoardWin(boardIndex) {
  return (
    (currentPlayer === boards[boardIndex][0] &&
      boards[boardIndex][1] &&
      boards[boardIndex][2]) ||
    (currentPlayer === boards[boardIndex][3] &&
      boards[boardIndex][4] &&
      boards[boardIndex][5]) ||
    (currentPlayer === boards[boardIndex][6] &&
      boards[boardIndex][7] &&
      boards[boardIndex][8]) ||
    (currentPlayer === boards[boardIndex][0] &&
      boards[boardIndex][3] &&
      boards[boardIndex][6]) ||
    (currentPlayer === boards[boardIndex][1] &&
      boards[boardIndex][4] &&
      boards[boardIndex][7]) ||
    (currentPlayer === boards[boardIndex][2] &&
      boards[boardIndex][5] &&
      boards[boardIndex][8]) ||
    (currentPlayer === boards[boardIndex][0] &&
      boards[boardIndex][4] &&
      boards[boardIndex][8]) ||
    (currentPlayer === boards[boardIndex][2] &&
      boards[boardIndex][4] &&
      boards[boardIndex][6])
  );
}

function setSmallBoardWin(boardIndex) {
  if (checkSmallBoardWin(boardIndex)) {
    smallBoardWins[boardIndex] = currentPlayer;
    if (currentPlayer === "X") {
      button.parentElement.classList.add("small-board-win-x");
    } else {
      button.parentElement.classList.add("small-board-win-o");
    }
    activeBoard = null; // Reset activeBoard to allow the next player to choose any board
  }
}

function checkOverallWin() {
  return (
    (currentPlayer === smallBoardWins[0] &&
      smallBoardWins[1] &&
      smallBoardWins[2]) ||
    (currentPlayer === smallBoardWins[3] &&
      smallBoardWins[4] &&
      smallBoardWins[5]) ||
    (currentPlayer === smallBoardWins[6] &&
      smallBoardWins[7] &&
      smallBoardWins[8]) ||
    (currentPlayer === smallBoardWins[0] &&
      smallBoardWins[3] &&
      smallBoardWins[6]) ||
    (currentPlayer === smallBoardWins[1] &&
      smallBoardWins[4] &&
      smallBoardWins[7]) ||
    (currentPlayer === smallBoardWins[2] &&
      smallBoardWins[5] &&
      smallBoardWins[8]) ||
    (currentPlayer === smallBoardWins[0] &&
      smallBoardWins[4] &&
      smallBoardWins[8]) ||
    (currentPlayer === smallBoardWins[2] &&
      smallBoardWins[4] &&
      smallBoardWins[6])
  );
}

function alertWinner() {
  if (checkOverallWin()) {
    alert(`Player ${currentPlayer} wins the game!`);
  }
}

function placePiece(boardIndex, cellIndex) {
  boards[boardIndex][cellIndex] = currentPlayer;
  button.textContent = currentPlayer;
  activeBoard = cellIndex;

  if (smallBoardWins[activeBoard] !== null) {
    activeBoard = null; // Reset activeBoard if the next board is already won
  }
}

function activeBoardCheck(boardIndex) {
  return activeBoard === null || activeBoard === boardIndex;
}

function showActiveBoard() {
  if (activeBoard !== null) {
    gameBoard.children[activeBoard].classList.add("active-board");
  }
}

function resetActiveBoard() {
  if (activeBoard !== null) {
    gameBoard.children[activeBoard].classList.remove("active-board");
  }
}
