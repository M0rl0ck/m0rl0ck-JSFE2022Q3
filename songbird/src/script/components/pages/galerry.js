import createHtmlElement from "../../function/function";
import birdsData from "../../data/dataBird";
import Player from "../../base/player";

export default class Galerry {
  constructor(lang, observer) {
    this.lang = lang;
    this.observer = observer;
    this.birdsData = birdsData;
    this.index = 0;
    this.container = createHtmlElement("section", "gallery-container");
    this.container.style.display = "none";
    this.carouselContainer = createHtmlElement(
      "div",
      "carousel-container",
      "",
      this.container
    );
    const buttonContainer = createHtmlElement(
      "div",
      "carousel-buttons",
      "",
      this.container
    );
    this.buttonLeft = createHtmlElement(
      "div",
      "carousel-button carousel-button_left",
      "",
      buttonContainer
    );
    this.buttonRight = createHtmlElement(
      "div",
      "carousel-button carousel-button_right",
      "",
      buttonContainer
    );
    this.elements = this.createElements();
    const playerContainer = createHtmlElement(
      "div",
      "player-container",
      "",
      this.container
    );
    this.player = new Player(this.observer);
    playerContainer.append(this.player.playerContainer);

    this.player.player.src = this.elements[this.index].data.audio;
    this.carouselContainer.append(this.elements[this.index].el);

    this.observer.addEvent("changeLang", this.changeLang);
    this.buttonLeft.addEventListener("click", this.prevBird);
    this.buttonRight.addEventListener("click", this.nextBird);
  }

  createElements = () => {
    const elements = [];
    this.birdsData.forEach((item) => {
      item.data.forEach((el) => {
        const bird = {};
        bird.data = el;
        bird.el = createHtmlElement("div", "carousel-bird-container");
        const imgContainer = createHtmlElement(
          "div",
          "img-container",
          "",
          bird.el
        );
        const image = createHtmlElement("img", "bird-img", "", imgContainer);
        image.src = bird.data.image;
        const birdDetailContainer = createHtmlElement(
          "div",
          "bird-detail-container",
          "",
          bird.el
        );
        bird.name = createHtmlElement(
          "p",
          "bird-name-detail",
          bird.data.name[this.lang],
          birdDetailContainer
        );
        createHtmlElement(
          "p",
          "bird-latine-name",
          bird.data.species,
          birdDetailContainer
        );
        bird.description = createHtmlElement(
          "p",
          "bird-descriptions",
          bird.data.description[this.lang],
          birdDetailContainer
        );

        elements.push(bird);
      });
    });
    return elements;
  };

  changeLang = (lang) => {
    this.lang = lang;
    this.elements.forEach((bird) => {
      bird.name.innerHTML = bird.data.name[this.lang];
      bird.description.innerHTML = bird.data.description[this.lang];
    });
  };

  nextBird = () => {
    this.index = this.index >= this.elements.length - 1 ? 0 : this.index + 1;
    this.goNext();
  };

  goNext = () => {
    this.buttonRight.removeEventListener("click", this.nextBird);
    this.buttonLeft.removeEventListener("click", this.prevBird);
    this.player.stop();
    this.player.player.src = this.elements[this.index].data.audio;
    this.carouselContainer.addEventListener("transitionend", this.showNext);
    this.carouselContainer.classList.add("carousel-container_hidden");
  };

  showNext = (e) => {
    if (e.propertyName !== 'transform') {
      return;
    }
    this.carouselContainer.removeEventListener("transitionend", this.showNext);
    this.carouselContainer.innerHTML = "";
    this.carouselContainer.append(this.elements[this.index].el);
    
    this.carouselContainer.addEventListener("transitionend", this.addEvents);
    this.carouselContainer.classList.remove("carousel-container_hidden");
  };

  addEvents = (e) => {
    if (e.propertyName !== 'transform') {
      return;
    }
    this.carouselContainer.removeEventListener("transitionend", this.addEvents);
    this.buttonLeft.addEventListener("click", this.prevBird);
    this.buttonRight.addEventListener("click", this.nextBird);
  };

  prevBird = () => {
    this.index = this.index <= 0 ? this.elements.length - 1 : this.index - 1;
    this.goNext();
  };
}
