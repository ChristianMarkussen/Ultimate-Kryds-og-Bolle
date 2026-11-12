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
    resetPlayer();
    placePiece(boardIndex, cellIndex);
    setSmallBoardWin(boardIndex, cellIndex);
    showActiveBoard();
    alertWinner();
    changePlayer();
    saveGave();
  }
});

function resetPlayer() {
  if (currentPlayer === "X") {
    playerTurn.classList.remove("player1");
    playerTurn.textContent = currentPlayer + "'s";
  } else {
    playerTurn.classList.remove("player2");
    playerTurn.textContent = currentPlayer + "'s";
  }
}

function changePlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  if (currentPlayer === "X") {
    playerTurn.classList.add("player1");
    playerTurn.textContent = currentPlayer + "'s";
  } else {
    playerTurn.classList.add("player2");
    playerTurn.textContent = currentPlayer + "'s";
  }
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
      currentPlayer === boards[boardIndex][1] &&
      currentPlayer === boards[boardIndex][2]) ||
    (currentPlayer === boards[boardIndex][3] &&
      currentPlayer === boards[boardIndex][4] &&
      currentPlayer === boards[boardIndex][5]) ||
    (currentPlayer === boards[boardIndex][6] &&
      currentPlayer === boards[boardIndex][7] &&
      currentPlayer === boards[boardIndex][8]) ||
    (currentPlayer === boards[boardIndex][0] &&
      currentPlayer === boards[boardIndex][3] &&
      currentPlayer === boards[boardIndex][6]) ||
    (currentPlayer === boards[boardIndex][1] &&
      currentPlayer === boards[boardIndex][4] &&
      currentPlayer === boards[boardIndex][7]) ||
    (currentPlayer === boards[boardIndex][2] &&
      currentPlayer === boards[boardIndex][5] &&
      currentPlayer === boards[boardIndex][8]) ||
    (currentPlayer === boards[boardIndex][0] &&
      currentPlayer === boards[boardIndex][4] &&
      currentPlayer === boards[boardIndex][8]) ||
    (currentPlayer === boards[boardIndex][2] &&
      currentPlayer === boards[boardIndex][4] &&
      currentPlayer === boards[boardIndex][6])
  );
}

function setSmallBoardWin(boardIndex, cellIndex) {
  if (checkSmallBoardWin(boardIndex)) {
    smallBoardWins[boardIndex] = currentPlayer;

    if (currentPlayer === "X") {
      button.parentElement.classList.add("small-board-win-x");
    } else {
      button.parentElement.classList.add("small-board-win-o");
    }
  }
}

function checkOverallWin() {
  return (
    (currentPlayer === smallBoardWins[0] &&
      currentPlayer === smallBoardWins[1] &&
      currentPlayer === smallBoardWins[2]) ||
    (currentPlayer === smallBoardWins[3] &&
      currentPlayer === smallBoardWins[4] &&
      currentPlayer === smallBoardWins[5]) ||
    (currentPlayer === smallBoardWins[6] &&
      currentPlayer === smallBoardWins[7] &&
      currentPlayer === smallBoardWins[8]) ||
    (currentPlayer === smallBoardWins[0] &&
      currentPlayer === smallBoardWins[3] &&
      currentPlayer === smallBoardWins[6]) ||
    (currentPlayer === smallBoardWins[1] &&
      currentPlayer === smallBoardWins[4] &&
      currentPlayer === smallBoardWins[7]) ||
    (currentPlayer === smallBoardWins[2] &&
      currentPlayer === smallBoardWins[5] &&
      currentPlayer === smallBoardWins[8]) ||
    (currentPlayer === smallBoardWins[0] &&
      currentPlayer === smallBoardWins[4] &&
      currentPlayer === smallBoardWins[8]) ||
    (currentPlayer === smallBoardWins[2] &&
      currentPlayer === smallBoardWins[4] &&
      currentPlayer === smallBoardWins[6])
  );
}

function alertWinner() {
  if (checkOverallWin()) {
    alert(`Player ${currentPlayer} wins the game!`);
    resetGame();
  }
}

function placePiece(boardIndex, cellIndex) {
  boards[boardIndex][cellIndex] = currentPlayer;
  button.textContent = currentPlayer;

  if (checkSmallBoardWin(boardIndex)) {
    activeBoard = null;
  } else if (isSmallBoardFull(boardIndex)) {
    activeBoard = null;
  } else {
    activeBoard = cellIndex;
  }

  if (smallBoardWins[activeBoard] !== null) {
    activeBoard = null; // Reset activeBoard if the next board is already won
  }
}

function activeBoardCheck(boardIndex) {
  return activeBoard === null || activeBoard === boardIndex;
}

function showActiveBoard() {
  if (activeBoard === null) {
    showAllActiveBoards();
  } else if (activeBoard !== null) {
    gameBoard.children[activeBoard].classList.add("active-board");
  }
}

function resetActiveBoard() {
  if (activeBoard === null) {
    removeAllActiveBoards();
  } else {
    gameBoard.children[activeBoard].classList.remove("active-board");
  }
}

function showAllActiveBoards() {
  for (let i = 0; i < 9; i++) {
    if (smallBoardWins[i] === null && !isSmallBoardFull(i)) {
      gameBoard.children[i].classList.add("active-board");
      console.log(i);
    }
  }
}

function removeAllActiveBoards() {
  for (let i = 0; i < 9; i++) {
    if (smallBoardWins[i] === null) {
      gameBoard.children[i].classList.remove("active-board");
    }
  }
}

function isSmallBoardFull(boardIndex) {
  let usedCell = 0;
  for (let i = 0; i < 9; i++) {
    if (boards[boardIndex][i] !== null) {
      usedCell++;
    }
  }
  return usedCell === 9;
}

const playerTurn = document.querySelector("#playerTurn");

function saveGave() {
  let gameState = {
    boards,
    currentPlayer,
    smallBoardWins,
    activeBoard,
  };

  localStorage.setItem("ultimateTicTacToe", JSON.stringify(gameState));
}

function loadGame() {
  let savedGame = localStorage.getItem("ultimateTicTacToe");

  if (savedGame !== null) {
    let gameState = JSON.parse(savedGame);

    boards = gameState.boards;
    currentPlayer = gameState.currentPlayer;
    smallBoardWins = gameState.smallBoardWins;
    activeBoard = gameState.activeBoard;
  }
}

function renderBoard() {
  for (let i = 0; i < 9; i++) {
    const smallBoard = gameBoard.children[i];

    for (let j = 0; j < 9; j++) {
      const button = smallBoard.children[j];

      button.textContent = boards[i][j];
    }
  }
}

function resetGame() {
  boards = Array.from({ length: 9 }, () => Array(9).fill(null));

  currentPlayer = "X";
  smallBoardWins = Array(9).fill(null);
  activeBoard = null;
  localStorage.removeItem("ultimateTicTacToe");

  renderBoard();
  removeSmallBoardWins();
  setPlayerTurn(currentPlayer);
  showActiveBoard();
}

function setPlayerTurn(currentPlayer) {
  if (currentPlayer === "X") {
    playerTurn.classList.add("player1");
    playerTurn.textContent = currentPlayer + "'s";
  } else {
    playerTurn.classList.add("player2");
    playerTurn.textContent = currentPlayer + "'s";
  }
}

function renderSmallBoardWins() {
  for (let i = 0; i < 9; i++) {
    if (smallBoardWins[i] === "X") {
      gameBoard.children[i].classList.add("small-board-win-x");
    } else if (smallBoardWins[i] === "O") {
      gameBoard.children[i].classList.add("small-board-win-o");
    }
  }
}

function removeSmallBoardWins() {
  for (let i = 0; i < 9; i++) {
    gameBoard.children[i].classList.remove("small-board-win-x");
    gameBoard.children[i].classList.add("small-board-win-o");
  }
}

loadGame();
renderBoard();
renderSmallBoardWins;
setPlayerTurn(currentPlayer);
showActiveBoard();
