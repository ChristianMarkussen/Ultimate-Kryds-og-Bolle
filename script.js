const btn = document.querySelector("button");
btn.addEventListener("click", setText);

function setText() {
  btn.textContent = "X";
}

const playerName1 = document.querySelector("#playerName1");
const playerName2 = document.querySelector("#playerName2");
const enter = document.querySelector("#enter");
const player1 = document.querySelector("#player1");
const player2 = document.querySelector("#player2");

enter.addEventListener("click", setName);

function setName() {
  player1.textContent = playerName1.value;
  player2.textContent = playerName2.value;
}
