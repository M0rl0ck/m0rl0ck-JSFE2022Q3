import ITestimonialsCard from "../infostructure/interfaces/ITestimonialsCard";

import { createHtmlElement, startScroll, stopScroll } from "../funcs/function";
import {
  MAINDESKTOPWIDTH,
  MAINTABLETWITH,
  SHIFT,
} from "../infostructure/constans";
import { testimonialsCardData } from "../infostructure/data/testimonialsCardData";

class TestimonialsCarousel {
  cards: ITestimonialsCard[];
  input: HTMLInputElement;
  header: HTMLElement;
  container: HTMLElement;
  popUp: HTMLElement;
  constructor(data: ITestimonialsCard[]) {
    this.cards = [...data];
  }

  private createCard(data: ITestimonialsCard): HTMLElement {
    const template = `
    <div class="testimonials__card_content">
      <div class="testimonials__card__header">
        <div class="testimonials__card__ico">
          <img src="../../assets/foto/${data.icon}" alt="${
      data.name.split(" ")[0]
    }" />
        </div>
        <div class="testimonials__card__title">
          <h5>${data.name}</h5>
          <p>Local ${data.location} <span>•</span> ${data.time}</p>
        </div>
      </div>
      <div class="testimonials__card__text">
        <p>
            ${data.text}
        </p>
      </div>
    </div>
    `;
    const card = createHtmlElement(
      "div",
      "testimonials__card_border",
      template
    );
    card.setAttribute("id", `${data.id}`);
    return card;
  }

  private closedPopUp = (e: Event): void => {
    const el = e.target as HTMLElement;
    if (
      el.classList.contains("popUpCard__shaddow") ||
      el.closest(".popUp_x")
    ) {
      this.popUp.remove();
      startScroll();
    }
  };

  private createPopUp = (data: ITestimonialsCard): void => {
    this.popUp = createHtmlElement(
      "div",
      "popUpCard__shaddow",
      "",
      document.body
    );
    const card = this.createCard(data);
    const template = ' <img src="../../assets/foto/x_icon.png" alt="X-icon" />';
    createHtmlElement("div", "popUp_x", template, card);
    this.popUp.append(card);
    this.popUp.addEventListener("click", this.closedPopUp);
  };

  private openPopUp = (e: Event): void => {
    if (window.innerWidth <= MAINTABLETWITH) {
      const el = e.target as HTMLElement;
      const id = el.closest(".testimonials__card_border").id;
      this.createPopUp(this.cards[Number(id)]);
      stopScroll();
    }
  };

  private shiftCarousel = (): void => {
    const width = window.innerWidth;
    if (width > MAINDESKTOPWIDTH) {
      this.input.setAttribute("max", "7");
      const shift = Number(this.input.value) * SHIFT.MAX;
      this.container.style.transform = `translate(${-shift}px, 0)`;
    } else if (width <= MAINDESKTOPWIDTH && width > MAINTABLETWITH) {
      this.input.setAttribute("max", "8");
      const shift = Number(this.input.value) * SHIFT.MIN;
      this.container.style.transform = `translate(${-shift}px, 0)`;
    } else if (width <= MAINTABLETWITH) {
      this.input.setAttribute("max", "8");
      const shift = Number(this.input.value) * SHIFT.HEIGTH;
      this.container.style.transform = `translate(0, ${-shift}px)`;
    }
  };

  public init(): void {
    this.header = document.querySelector(
      ".testimonials__container__header"
    ) as HTMLElement;
    this.container = createHtmlElement(
      "div",
      "testimonials__container",
      "",
      this.header
    );
    this.input = document.querySelector(".progress__rang") as HTMLInputElement;
    for (let i = 0; i < 11; i++) {
      this.container.append(this.createCard(this.cards[i]));
    }
    this.input.addEventListener("input", this.shiftCarousel);
    window.addEventListener("resize", this.shiftCarousel);
    this.header.addEventListener("click", this.openPopUp);
  }
}

const testimonials = new TestimonialsCarousel(testimonialsCardData);

export default testimonials;
