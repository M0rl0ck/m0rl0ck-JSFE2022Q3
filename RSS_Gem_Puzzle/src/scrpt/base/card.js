import { createHtmlElement } from '../function';

class Card {
  constructor(width, value, left, top) {
    this.width = width;
    this.value = value;
    this.cardContainer = createHtmlElement('div', 'cardContainer');
    this.cardContainer.dataset.id = value;
    this.cardContainer.style.width = `${width}px`;
    this.cardContainer.style.fontSize = `${width / 1.6}px`;
    this.cardContainer.style.left = `${left}px`;
    this.cardContainer.style.top = `${top}px`;
    createHtmlElement('div', 'cardContent', `<p>${value}</p>`, this.cardContainer);
  }

  resize(width) {
    this.cardContainer.style.width = `${width}px`;
    this.cardContainer.style.fontSize = `${width / 1.6}px`;
  }

  moveCard = (left, top) => {
    this.cardContainer.style.left = `${left}px`;
    this.cardContainer.style.top = `${top}px`;
  }
}

export default Card;