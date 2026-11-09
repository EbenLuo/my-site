/* machine.js — the useless machine and the bug game. */
(() => {
  "use strict";

  /* ---------- The useless machine ---------- */

  const device = document.getElementById("machine-device");
  const machineSwitch = document.getElementById("machine-switch");
  const machineStatus = document.getElementById("machine-status");

  if (device && machineSwitch && machineStatus) {
    let busy = false;

    const turnOff = (message) => {
      machineSwitch.setAttribute("aria-pressed", "false");
      machineSwitch.querySelector(".switch-label").textContent = "Press the switch";
      device.classList.remove("is-open");
      machineStatus.textContent = message;
    };

    machineSwitch.addEventListener("click", () => {
      if (busy) return;

      if (machineSwitch.getAttribute("aria-pressed") === "true") {
        turnOff("You turned it off. It prefers that.");
        return;
      }

      busy = true;
      machineSwitch.setAttribute("aria-pressed", "true");
      machineSwitch.querySelector(".switch-label").textContent = "On";
      device.classList.add("is-open");
      machineStatus.textContent = "The machine is on. It does not like being on.";

      window.setTimeout(() => {
        turnOff("The machine turned itself off. That is its only job.");
        busy = false;
      }, 1600);
    });
  }

  /* ---------- Catch the bug ---------- */

  const grid = document.getElementById("game-grid");
  const scoreEl = document.getElementById("game-score");
  const timeEl = document.getElementById("game-time");
  const startButton = document.getElementById("game-start");
  const gameStatus = document.getElementById("game-status");

  if (!grid || !scoreEl || !timeEl || !startButton || !gameStatus) return;

  const cells = [];
  const SECONDS = 20;
  let score = 0;
  let timeLeft = SECONDS;
  let active = -1;
  let playing = false;
  let timer = null;

  for (let index = 0; index < 9; index += 1) {
    const cell = document.createElement("button");
    cell.type = "button";
    cell.className = "cell";
    cell.setAttribute("aria-label", "Cell " + (index + 1));
    cell.addEventListener("click", () => hit(index));
    grid.append(cell);
    cells.push(cell);
  }

  const clearGrid = () => {
    cells.forEach((cell, index) => {
      cell.textContent = "";
      cell.classList.remove("has-bug");
      cell.setAttribute("aria-label", "Cell " + (index + 1));
    });
    active = -1;
  };

  const placeBug = () => {
    clearGrid();
    active = Math.floor(Math.random() * cells.length);
    cells[active].textContent = "🐞";
    cells[active].classList.add("has-bug");
    cells[active].setAttribute("aria-label", "Bug in cell " + (active + 1));
  };

  const hit = (index) => {
    if (!playing) return;

    if (index === active) {
      score += 1;
      gameStatus.textContent = "Caught it. Next one.";
    } else {
      score = Math.max(0, score - 1);
      gameStatus.textContent = "Missed. The bug moved.";
    }

    scoreEl.textContent = score;
    placeBug();
  };

  const endGame = () => {
    playing = false;
    window.clearInterval(timer);
    timer = null;
    clearGrid();
    startButton.disabled = false;
    startButton.textContent = "Play again";
    gameStatus.textContent =
      "Time. You caught " + score + (score === 1 ? " bug." : " bugs.");
  };

  const tick = () => {
    timeLeft -= 1;
    timeEl.textContent = timeLeft;
    if (timeLeft <= 0) endGame();
  };

  const startGame = () => {
    playing = true;
    score = 0;
    timeLeft = SECONDS;
    scoreEl.textContent = "0";
    timeEl.textContent = SECONDS;
    startButton.disabled = true;
    startButton.textContent = "Playing…";
    gameStatus.textContent = "Catch the bug. Twenty seconds.";
    placeBug();
    window.clearInterval(timer);
    timer = window.setInterval(tick, 1000);
  };

  startButton.addEventListener("click", startGame);
})();
