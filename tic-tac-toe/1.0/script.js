// Variables
const container = document.getElementById("container"),
  cells = container.querySelectorAll(".cell"),
  turnBox = document.getElementById("turn-box"),
  turnBoxChildren = turnBox.children,
  restartBtn = document.querySelector(".restart");

let turn = "X",
  isGameOver = false;

// Event Listener
cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    if (!isGameOver && cell.innerHTML === "") {
      cell.innerHTML = turn;
      checkWin();
      checkDraw();
      changeTurn();
    }
  });
});

// Functions

function checkWin() {
  const winPattern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  winPattern.forEach((e) => {
    let c1 = cells[e[0]];
    let c2 = cells[e[1]];
    let c3 = cells[e[2]];

    if (
      c1.innerHTML === c2.innerHTML &&
      c2.innerHTML === c3.innerHTML &&
      c3.innerHTML !== ""
    ) {
      container.classList.add("ended");
      c1.style.backgroundColor = "lightblue";
      c2.style.backgroundColor = "lightblue";
      c3.style.backgroundColor = "lightblue";

      setTimeout(() => {
        alert("Game berakhir, pemenangnya: " + c1.innerHTML);
        turnBoxChildren[0].classList.remove("active");
        turnBoxChildren[1].classList.remove("active");
        restartBtn.classList.add("game-over");
      }, 200);

      isGameOver = true;
      return true;
    } else {
      return false;
    }
  });
}

function checkDraw() {
  let unFilledCells = [...cells].filter((e) => e.innerHTML === "");
  if (unFilledCells.length === 0 && isGameOver !== true) {
    alert("Game berakhir, hasilnya seri!");
    container.classList.add("ended");
    turnBoxChildren[0].classList.remove("active");
    turnBoxChildren[1].classList.remove("active");
    restartBtn.classList.add("game-over");
    return true;
  } else {
    return false;
  }
}

function changeTurn() {
  if (turn === "X") {
    turn = "O";
    turnBoxChildren[0].classList.remove("active");
    turnBoxChildren[1].classList.add("active");
  } else {
    turn = "X";
    turnBoxChildren[1].classList.remove("active");
    turnBoxChildren[0].classList.add("active");
  }
}
