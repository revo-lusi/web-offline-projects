// Variables
const container = document.getElementById("container"),
  cells = container.querySelectorAll(".cell"),
  turnBox = document.getElementById("turn-box"),
  restartBtn = document.querySelector(".restart"),
  twoModesContainer = document.querySelector(".two-modes-container"),
  PvpMode = twoModesContainer.querySelector(".pvp-mode"),
  PveMode = twoModesContainer.querySelector(".pve-mode"),
  winningPattern = [
    [0, 1, 2], // win horizontally (1st row)
    [3, 4, 5], // win horizontally (2nd row)
    [6, 7, 8], // win horizontally (3rd row)
    [0, 3, 6], // win vertically (1st column)
    [1, 4, 7], // win vertically (2nd column)
    [2, 5, 8], // win vertically (3nd column)
    [0, 4, 8], // win with main diagonal
    [2, 4, 6], // win with secondary diagonal
  ];

let turn = "X",
  isGameOver = false,
  player = "X",
  bot = "O";

// PvE (player vs environtment/bot) Mode
PveMode.addEventListener("click", (e) => {
  // Turn on all displays!
  twoModesContainer.style.display = "none";
  turnBox.style.display = "flex";
  container.style.display = "grid";

  // Event Listener
  cells.forEach((cell) => {
    cell.addEventListener("click", () => {
      if (!isGameOver && cell.innerHTML === "") {
        cell.innerHTML = turn;
        cell.classList.add("filled");
        checkWin();
        checkDraw();
        changeTurn();

        setTimeout(() => {
          if (!isGameOver) {
            botTurn();
            checkWin();
            checkDraw();
            changeTurn();
          }
        }, 610);
      }
    });
  });
});

// PvP (player vs player) Mode
PvpMode.addEventListener("click", (e) => {
  // Turn on all displays!
  twoModesContainer.style.display = "none";
  turnBox.style.display = "flex";
  container.style.display = "grid";

  // Event Listener
  cells.forEach((cell) => {
    cell.addEventListener("click", () => {
      if (!isGameOver && cell.innerHTML === "") {
        cell.innerHTML = turn;
        cell.classList.add("filled");
        checkWin();
        checkDraw();
        changeTurn();
      }
    });
  });
});

// Functions
function checkWin() {
  winningPattern.forEach((e) => {
    const c1 = cells[e[0]],
      c2 = cells[e[1]],
      c3 = cells[e[2]];

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
        container.classList.add("ended");
        turnBox.classList.add("ended");
        restartBtn.classList.add("game-over");
      }, 570);

      isGameOver = true;
    }
  });
}

function checkDraw() {
  if (
    [...cells].filter((e) => e.innerHTML === "").length === 0 &&
    !isGameOver
  ) {
    setTimeout(() => {
      alert("Game berakhir, hasilnya seri!");
      container.classList.add("ended");
      turnBox.classList.add("ended");
      restartBtn.classList.add("game-over");
    }, 570);
  }
}

function changeTurn() {
  if (turn === "X") {
    turn = "O";
    turnBox.classList.add("o-turn");
    turnBox.classList.remove("x-turn");
  } else {
    turn = "X";
    turnBox.classList.add("x-turn");
    turnBox.classList.remove("o-turn");
  }
}

function botTurn() {
  let unFilledCells = [...cells].filter((e) => e.innerHTML === ""),
    randomIndex = Math.floor(Math.random() * unFilledCells.length);

  // 1 - utamakan kemenangan
  if (!achieveVictory()) {
    // 2 - cegah player dari kemenangan!
    if (!preventPlayerFromWinning()) {
      // 3- Kalau aman, isi kotak random (bebas dimanapun)
      unFilledCells[randomIndex].innerHTML = turn;
      unFilledCells[randomIndex].classList.add("filled");
    }
  }
}

function preventPlayerFromWinning() {
  let arr = winningPattern.filter((e) => {
    const c1 = cells[e[0]],
      c2 = cells[e[1]],
      c3 = cells[e[2]];

    return (
      (c1.innerHTML === c2.innerHTML && c2.innerHTML === player) || // [o,o,""]
      (c1.innerHTML === c3.innerHTML && c3.innerHTML === player) || // [o,"",o]
      (c2.innerHTML === c3.innerHTML && c3.innerHTML === player) // // ["",o,o]
    );
  })[0];

  try {
    let index = arr.filter((e) => cells[e].innerHTML === "")[0];
    if (index.length === 0) {
      return false;
    } else {
      cells[index].innerHTML = bot;
      cells[index].classList.add("filled");
      return true;
    }
  } catch {
    return false;
  }
}

function achieveVictory() {
  let arr = winningPattern.filter((e) => {
    const c1 = cells[e[0]],
      c2 = cells[e[1]],
      c3 = cells[e[2]];

    return (
      (c1.innerHTML === c2.innerHTML && c2.innerHTML === bot) || // [o,o,""]
      (c1.innerHTML === c3.innerHTML && c3.innerHTML === bot) || // [o,"",o]
      (c2.innerHTML === c3.innerHTML && c3.innerHTML === bot) // // ["",o,o]
    );
  })[0];

  try {
    let index = arr.filter((e) => cells[e].innerHTML === "")[0];
    if (index.length === 0) {
      return false;
    } else {
      cells[index].innerHTML = bot;
      cells[index].classList.add("filled");
      isGameOver = true;
      return true;
    }
  } catch {
    return false;
  }
}
