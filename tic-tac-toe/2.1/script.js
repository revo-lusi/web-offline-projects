// Variable-variable
const container = document.getElementById("container"),
  cells = container.querySelectorAll(".cell"),
  turnBox = document.getElementById("turn-box"),
  restartBtn = document.querySelector(".restart"),
  twoModesContainer = document.querySelector(".two-modes-container"),
  PvpMode = twoModesContainer.querySelector(".pvp-mode"),
  PveMode = twoModesContainer.querySelector(".pve-mode"),
  winningPattern = [
    [0, 1, 2], // menang horizontal (baris ke-1)
    [3, 4, 5], // menang horizontal (baris ke-2)
    [6, 7, 8], // menang horizontal (baris ke-3)

    [0, 3, 6], // menang vertikal (kolom ke-1)
    [1, 4, 7], // menang vertikal (kolom ke-2)
    [2, 5, 8], // menang vertikal (kolom ke-3)

    [0, 4, 8], // menang diagonal utama (atas-kiri -> bawah-kanan)
    [2, 4, 6], // menang diagonal sekunder (atas-kanan -> bawah-kiri)
  ];

let turn = "X",
  isGameOver = false,
  player = "X",
  bot = "O";

// ket: variable player & bot saat ini tidak terlalu dibutuhkan,
// sengaja dibuat untuk pengembangan game kedepannya,
// dimana user bisa memilih peran (ingin jadi X atau O)

// Event Listener untuk Mode PvE (player vs environtment/bot)
PveMode.addEventListener("click", () => {
  // Nyalakan semua display!
  twoModesContainer.style.display = "none";
  turnBox.style.display = "flex";
  container.style.display = "grid";

  // Event Listener untuk setiap sel/kotak yang diklik
  cells.forEach((cell) => {
    cell.addEventListener("click", () => {
      if (!isGameOver && cell.innerHTML === "") {
        cell.innerHTML = turn;
        cell.classList.add("filled");
        checkWin();
        checkDraw();
        changeTurn();

        if (!isGameOver) {
          setTimeout(() => {
            botTurn();
            checkWin();
            checkDraw();
            changeTurn();
          }, 610);
        }
      }
    });
  });
});

// Event Listener untuk Mode PvP (player vs player)
PvpMode.addEventListener("click", () => {
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

  if (!isGameOver) {
    // 1 - Utamakan kemenangan
    if (!botStrategy(bot)) {
      // 2 - Cegah player dari kemenangan!
      if (!botStrategy(player)) {
        // 3- Kalau aman, isi kotak random (bebas dimanapun)
        unFilledCells[randomIndex].innerHTML = turn;
        unFilledCells[randomIndex].classList.add("filled");
      }
    }
  }
}

function botStrategy(target) {
  // Jika yang ditarget adalah bot, kejar kemenangan!
  // Jika yang ditarget adalah lawan, cegah lawan dari kemenangan!
  let arr = winningPattern.filter((e) => {
    const c1 = cells[e[0]],
      c2 = cells[e[1]],
      c3 = cells[e[2]];

    return (
      (c1.innerHTML === c2.innerHTML &&
        c2.innerHTML === target &&
        c3.innerHTML === "") || // [terisi, terisi,""]
      (c1.innerHTML === c3.innerHTML &&
        c3.innerHTML === target &&
        c2.innerHTML === "") || // [terisi, "", terisi]
      (c2.innerHTML === c3.innerHTML &&
        c3.innerHTML === target &&
        c1.innerHTML === "") // // ["", terisi, terisi]
    );
  });

  // sekedar jaga-jaga, kalau ditemukan 2 kemungkinan, bebas pilih yang mana
  let randomItem = arr[Math.floor(Math.random() * arr.length)];

  try {
    let index = randomItem.filter((e) => cells[e].innerHTML === "")[0];
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
