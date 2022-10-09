import IPetCard from "../infostructure/interfaces/IPetCard";
import createPetCard from "../../scripts/base/petCard";
import { createHtmlElement, shuffle } from "../funcs/function";
import { petCardsData } from "../infostructure/data/petCardsData";

class Carousel {
  cards: IPetCard[] = [];
  next: HTMLElement;
  prev: HTMLElement;
  current: HTMLElement;
  buttonNext: HTMLElement;
  buttonPrev: HTMLElement;
  carousel: HTMLElement;

  constructor(pets: IPetCard[]) {
    this.buttonNext = document.querySelector(".button_next") as HTMLElement;
    this.buttonPrev = document.querySelector(".button_prev") as HTMLElement;
    for (let i = 0; i < pets.length; i++) {
      this.cards.push(pets[i]);
    }
  }

  private createCarusel(newClass: string): HTMLElement {
    const carouselClass = newClass
      ? `carousel__container carousel__container_${newClass}`
      : "carousel__container";
    const carouselContainer = createHtmlElement("div", carouselClass);
    const petCards = [...this.cards];
    shuffle(petCards);
    for (let i = 0; i < 6; i++) {
      carouselContainer.append(createPetCard(petCards[i]));
    }
    return carouselContainer;
  }
  
  public createNext() {
    this.prev.remove();
    this.prev = this.createCarusel('prev');
    this.carousel.prepend(this.prev);
    this.current.remove();
    this.current = this.next;
    this.next = this.createCarusel('next');
    this.carousel.append(this.next);
  }

  public createPrev() {
    this.next.remove();
    this.next = this.createCarusel('next');
    this.carousel.append(this.next);
    this.current.remove();
    this.current = this.prev;
    this.prev = this.createCarusel('prev');
    this.carousel.append(this.prev);
  }

  public init() {
    this.carousel = document.querySelector(".carousel__hidder");
    this.prev = this.createCarusel("prev");
    this.carousel.append(this.prev);
    this.current = this.createCarusel("");
    this.carousel.append(this.current);
    this.next = this.createCarusel("next");
    this.carousel.append(this.next);
  }
}

const carousel = new Carousel(petCardsData);

export { carousel };
