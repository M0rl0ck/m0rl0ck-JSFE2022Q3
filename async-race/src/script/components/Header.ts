import EventEmitter from "events";
import createHtmlElement from "../utils/createElement";
import { PageName } from "../infostructure/types";

type EmitsName = "chagePage";

export default class Header extends EventEmitter {
  buttonGarage: HTMLButtonElement;

  buttonWinners: HTMLButtonElement;

  header: HTMLElement;

  emit(event: EmitsName, data?: PageName) {
    return super.emit(event, data);
  }

  on(event: EmitsName, callback: (data: PageName) => void) {
    return super.on(event, callback);
  }

  constructor() {
    super();
    this.header = createHtmlElement("header", "header");
    const headerContainer = createHtmlElement("div", "header__container", "", this.header);
    const buttons = createHtmlElement("div", "header__buttons", "", headerContainer);
    this.buttonGarage = createHtmlElement("button", "button button__garage active", "Garage", buttons) as HTMLButtonElement;
    this.buttonGarage.disabled = true;
    this.buttonGarage.addEventListener("click", () => this.emit("chagePage", "garage"));
    this.buttonWinners = createHtmlElement("button", "button button__winners", "Winners", buttons) as HTMLButtonElement;
    this.buttonWinners.addEventListener("click", () => this.emit("chagePage", "winners"));
    createHtmlElement("h1", "", "ASYNC RACE", headerContainer);
  }

  setButton = (page: PageName) => {
    switch (page) {
      case "garage":
        this.buttonGarage.disabled = true;
        this.buttonGarage.classList.add('active');
        this.buttonWinners.disabled = false;
        this.buttonWinners.classList.remove('active');
        break;

      case "winners":
        this.buttonGarage.disabled = false;
        this.buttonGarage.classList.remove('active');
        this.buttonWinners.disabled = true;
        this.buttonWinners.classList.add('active');
        break;

      default:
        break;
    }
  };

  render = () => this.header;
}
