import Card from "./card";
import { field } from "../components/main";
import { genFieldArr } from "../function";
import { PUZZLEWIDTH, SCREENWIDTH } from "../constans/constans";

class Field {
  constructor(size) {
    this.field = field;
    this.size = size;
    this.fieldArr = [];
    this.cardWidth =
      window.innerWidth >= SCREENWIDTH.max
        ? PUZZLEWIDTH.max[size]
        : PUZZLEWIDTH.min[size];
    this.field.style.width = `${this.cardWidth * this.size}px`
    this.cards = [];
  }

  start() {
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
    this.field.innerHTML = '';
    this.cards.map(card => this.field.append(card.cardContainer));
  }
}

export default Field;
