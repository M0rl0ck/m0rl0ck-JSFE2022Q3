import Card from "./card";
import { field } from "../components/main";
import { genFieldArr } from "../function";
import { PUZZLEWIDTH, SCREENWIDTH } from "../constans/constans";
import swap from '../../assets/sound/swipe.mp3';
import sound from '../../assets/sound/click.mp3';

class Field {
  constructor(size) {
    this.field = field;
    this.size = size;
    this.fieldArr = [];
    this.cardWidth =
      window.innerWidth >= SCREENWIDTH.max
        ? PUZZLEWIDTH.max[size]
        : PUZZLEWIDTH.min[size];
    this.field.style.width = `${this.cardWidth * this.size}px`;
    this.cards = [];
    this.isMove = false;
    this.isMouseDown = false;
    this.zerroIndex = 0;
    this.prevIndex = 0;
  }

  isWin() {
    return !this.fieldArr.some((el, index) => el > 0 && el - 1 !== index);
  }

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
      const audio = new Audio();
      audio.src = sound;
      audio.play();
      if (this.isMove) {
        this.isMove = false;
      } else {
        [this.fieldArr[this.prevIndex], this.fieldArr[this.zerroIndex]] = [
          this.fieldArr[this.zerroIndex],
          this.fieldArr[this.prevIndex],
        ];
        const left = (this.zerroIndex % this.size) * this.cardWidth;
        const top = Math.floor(this.zerroIndex / this.size) * this.cardWidth;
        this.currentEl.style.left = `${left}px`;
        this.currentEl.style.top = `${top}px`;
        this.field.removeEventListener("mousedown", this.mouseDown);
        this.currentEl.addEventListener("transitionend", () =>
          this.field.addEventListener("mousedown", this.mouseDown)
        );
        //
      }
    }
  };

  start() {
    const audio = new Audio();
    audio.src = swap;
    audio.play();
    this.fieldArr = genFieldArr(this.size * this.size);
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
    this.field.addEventListener("mousedown", this.mouseDown);
    this.field.addEventListener("mouseup", this.mouseUp);
  }
}

export default Field;
