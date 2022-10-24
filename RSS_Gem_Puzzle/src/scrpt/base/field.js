import Card from "./card";
import { moves, timer, field, formField } from "../components/main";
import {
  buttonSound,
  hamburger,
  buttonResults,
  buttonSave,
  buttonContinue,
} from "../components/header";
import { createHtmlElement, genFieldArr } from "../function";
import { PUZZLEWIDTH, SCREENWIDTH } from "../constans/constans";
import swap from "../../assets/sound/swipe.mp3";
import sound from "../../assets/sound/click.mp3";
import soundWin from "../../assets/sound/win.mp3";

function createWinMessage() {
  const shadow = createHtmlElement("div", "shadow", "", document.body);
  createHtmlElement(
    "div",
    "winMessage",
    `Hooray! You solved the puzzle in ${timer.innerHTML} and ${moves.innerHTML} moves!`,
    shadow
  );
  shadow.addEventListener("click", () => {
    shadow.remove();
  });
}

class Field {
  constructor(size) {
    this.field = field;
    this.size = size;
    this.fieldArr = [];
    this.cardWidth =
      window.innerWidth > SCREENWIDTH.max
        ? PUZZLEWIDTH.max[size]
        : PUZZLEWIDTH.min[size];
    this.media = window.matchMedia(`(max-width: ${SCREENWIDTH.max}px)`);
    this.field.style.width = `${this.cardWidth * this.size}px`;
    this.isSound = !!buttonSound.classList.contains("checkSound_active");
    this.cards = [];
    this.isMove = false;
    this.isMouseDown = false;
    this.save = localStorage.saveGameGemPuzzle
      ? JSON.parse(localStorage.saveGameGemPuzzle)
      : {};
    this.records = localStorage.gameGemPuzzleRecords
      ? JSON.parse(localStorage.gameGemPuzzleRecords)
      : [];
    this.zerroIndex = 0;
    this.prevIndex = 0;
    this.moves = 0;
    this.time = 0;
    this.timerId = 0;
    this.isTimer = false;
    buttonSound.addEventListener("click", () => {
      buttonSound.classList.toggle("checkSound_active");
      this.isSound = !this.isSound;
    });
    formField.addEventListener("change", this.newSize);
    this.media.addEventListener("change", this.reSize);
    buttonResults.addEventListener("click", this.showResult);
    buttonContinue.addEventListener("click", this.loadGame);
    window.addEventListener("beforeunload", this.setLocalStorage);
  }

  setLocalStorage = () => {
    if (this.save && this.save.fieldArr) {
      localStorage.setItem("saveGameGemPuzzle", JSON.stringify(this.save));
    }
    if (this.records && this.records.length) {
      localStorage.setItem(
        "gameGemPuzzleRecords",
        JSON.stringify(this.records)
      );
    }
  };

  isWin() {
    return !this.fieldArr.some((el, index) => el > 0 && el - 1 !== index);
  }

  showResult = () => {
    if (this.records && this.records.length) {
      const shadow = createHtmlElement("div", "shadow", "", document.body);
      const rec = createHtmlElement(
        "div",
        "records",
        "<p>Moves</p><p>Time</p>",
        shadow
      );
      this.records.forEach((el) => {
        const min = Math.floor(el.time / 60)
          .toString()
          .padStart(2, "0");
        const sec = (el.time % 60).toString().padStart(2, "0");
        createHtmlElement("p", "", `${el.moves}`, rec);
        createHtmlElement("p", "", `${min}:${sec}`, rec);
      });
      shadow.addEventListener("click", () => {
        shadow.remove();
      });
    }
  };

  startTimer() {
    this.isTimer = true;
    this.timerId = setInterval(() => {
      this.time += 1;
      const min = Math.floor(this.time / 60)
        .toString()
        .padStart(2, "0");
      const sec = (this.time % 60).toString().padStart(2, "0");
      timer.innerHTML = `${min}:${sec}`;
    }, 1000);
  }

  stopTimer() {
    this.isTimer = false;
    clearInterval(this.timerId);
  }

  timerPause = () => {
    if (this.isTimer) {
      this.stopTimer();
    } else {
      this.startTimer();
    }
  };

  isCanMove(id) {
    let zerroIndex;
    let index;
    for (let i = 0; i < this.fieldArr.length; i += 1) {
      if (this.fieldArr[i] === 0) {
        zerroIndex = i;
        this.zerroIndex = i;
      }
      if (this.fieldArr[i] === Number(id)) {
        index = i;
        this.prevIndex = i;
      }
    }
    if (
      this.fieldArr[index - this.size] === 0 ||
      this.fieldArr[index + this.size] === 0
    ) {
      return true;
    }
    if (this.fieldArr[index - 1] === 0 || this.fieldArr[index + 1] === 0) {
      if (
        Math.floor(index / this.size) === Math.floor(zerroIndex / this.size)
      ) {
        return true;
      }
    }
    return false;
  }

  mouseDown = (e) => {
    const el = e.target.closest(".cardContainer");
    if (el) {
      if (this.isCanMove(el.dataset.id)) {
        this.isMouseDown = true;
        this.field.addEventListener("mousemove", this.mouseMove);
        this.currentEl = el;
      }
    }
  };

  mouseMove = () => {
    if (this.isMouseDown) {
      this.isMove = true;
    }
  };

  mouseUp = () => {
    if (this.isMouseDown) {
      this.isMouseDown = false;

      if (this.isMove) {
        this.isMove = false;
      } else {
        if (this.isSound) {
          const audio = new Audio();
          audio.src = sound;
          audio.play();
        }
        [this.fieldArr[this.prevIndex], this.fieldArr[this.zerroIndex]] = [
          this.fieldArr[this.zerroIndex],
          this.fieldArr[this.prevIndex],
        ];
        const left = (this.zerroIndex % this.size) * this.cardWidth;
        const top = Math.floor(this.zerroIndex / this.size) * this.cardWidth;
        this.currentEl.style.left = `${left}px`;
        this.currentEl.style.top = `${top}px`;
        // this.field.removeEventListener("mousedown", this.mouseDown);
        // this.currentEl.addEventListener("transitionend", () =>
        // this.field.addEventListener("mousedown", this.mouseDown)
        // );
        this.moves += 1;
        moves.innerHTML = this.moves.toString().padStart(2, "0");
      }
      if (this.isWin()) {
        this.win();
      }
    }
  };

  win() {
    this.stopTimer();
    hamburger.removeEventListener("click", this.timerPause);
    buttonSave.removeEventListener("click", this.saveGame);
    if (this.isSound) {
      const audio = new Audio();
      audio.src = soundWin;
      audio.play();
    }
    createWinMessage();
    this.field.removeEventListener("mousedown", this.mouseDown);
    this.records.push({ time: this.time, moves: this.moves });
    this.records.sort((a, b) => a.moves - b.moves);
    if (this.records.length > 10) {
      this.records.pop();
    }
  }

  saveGame = () => {
    this.save.size = this.size;
    this.save.fieldArr = [...this.fieldArr];
    this.save.moves = this.moves;
    this.save.time = this.time;
    if (this.isSound) {
      const audio = new Audio();
      audio.src = soundWin;
      audio.play();
    }
  };

  loadGame = () => {
    if (this.save && this.save.fieldArr) {
      if (this.isSound) {
        const audio = new Audio();
        audio.src = swap;
        audio.play();
      }
      this.stopTimer();
      this.size = this.save.size;
      this.fieldArr = [...this.save.fieldArr];
      this.moves = this.save.moves;
      this.time = this.save.time;
      moves.innerHTML = this.moves.toString().padStart(2, "0");
      const min = Math.floor(this.time / 60)
        .toString()
        .padStart(2, "0");
      const sec = (this.time % 60).toString().padStart(2, "0");
      timer.innerHTML = `${min}:${sec}`;
      this.cardWidth =
        window.innerWidth > SCREENWIDTH.max
          ? PUZZLEWIDTH.max[this.size]
          : PUZZLEWIDTH.min[this.size];
      this.field.style.width = `${this.cardWidth * this.size}px`;
      this.moveCards();
      this.field.addEventListener("mousedown", this.mouseDown);
      this.field.addEventListener("mouseup", this.mouseUp);
      hamburger.addEventListener("click", this.timerPause);
      buttonSave.addEventListener("click", this.saveGame);
      this.startTimer();
    }
  };

  newSize = (e) => {
    this.size = Number(e.target.value);
    this.field.innerHTML = "";
    this.cardWidth =
      window.innerWidth > SCREENWIDTH.max
        ? PUZZLEWIDTH.max[this.size]
        : PUZZLEWIDTH.min[this.size];
    this.field.style.width = `${this.cardWidth * this.size}px`;
    this.start();
  };

  reSize = () => {
    this.cardWidth =
      window.innerWidth > SCREENWIDTH.max
        ? PUZZLEWIDTH.max[this.size]
        : PUZZLEWIDTH.min[this.size];
    this.field.style.width = `${this.cardWidth * this.size}px`;
    this.moveCards();
  };

  moveCards() {
    this.cards = [];
    this.fieldArr.forEach((el, index) => {
      if (el) {
        const left = index % this.size;
        const top = Math.floor(index / this.size);
        const card = new Card(
          this.cardWidth,
          el,
          left * this.cardWidth,
          top * this.cardWidth
        );
        this.cards.push(card);
      }
    });
    this.field.innerHTML = "";
    this.cards.map((card) => this.field.append(card.cardContainer));
  }

  start() {
    if (this.isSound) {
      const audio = new Audio();
      audio.src = swap;
      audio.play();
    }
    this.stopTimer();
    timer.innerHTML = "00:00";
    moves.innerHTML = "00";
    this.time = 0;
    this.moves = 0;
    this.fieldArr = genFieldArr(this.size * this.size);
    this.moveCards();
    this.field.addEventListener("mousedown", this.mouseDown);
    this.field.addEventListener("mouseup", this.mouseUp);
    hamburger.addEventListener("click", this.timerPause);
    buttonSave.addEventListener("click", this.saveGame);
    this.startTimer();
  }
}

const gameField = new Field(4);

export default gameField;
