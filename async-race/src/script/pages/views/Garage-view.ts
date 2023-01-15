import EventEmitter from "events";
import createButton from "../../utils/createButton";
import createHtmlElement from "../../utils/createElement";
import createInputElement from "../../utils/createInputElement";
import GarageModel from "../models/Garage-model";
import { DEFAULTCAR } from "../../constants/constants";
import Trac from "../../base/Trac";

type EmitsName = "createCar" | "create100" | "nextPage" | "prevPage";
type GarageModelTType = InstanceType<typeof GarageModel>;

export default class GarageView extends EventEmitter {
  model: GarageModelTType;

  element: HTMLElement;

  buttonGenCar: HTMLButtonElement;

  buttonStart: HTMLButtonElement;

  buttonCreateCar: HTMLButtonElement;

  buttonReset: HTMLButtonElement;

  inputName: HTMLInputElement;

  inputColor: HTMLInputElement;

  tracksContainer: HTMLElement;

  coundCars: HTMLElement;

  buttonPrev: HTMLButtonElement;

  buttonNext: HTMLButtonElement;

  paginationText: HTMLElement;

  emit(event: EmitsName, name?: string, color?: string) {
    return super.emit(event, name, color);
  }

  on(event: EmitsName, callback: (name?: string, color?: string) => void) {
    return super.on(event, callback);
  }

  constructor(model: GarageModelTType) {
    super();
    this.model = model;
    this.element = createHtmlElement("div", "garage");
    this.buttonGenCar = createButton("button button__generateCars", "Generate 100 cars");
    this.buttonCreateCar = createButton("button button__newCar", `Create new car`);
    this.buttonReset = createButton("button returnCars", "Reset", true);
    this.buttonStart = createButton("button startCars", "Start");
    this.inputName = createInputElement("inputText", "text");
    this.inputName.value = DEFAULTCAR.name;
    this.inputColor = createInputElement("inputColor", "color");
    this.inputColor.value = DEFAULTCAR.color;
    this.coundCars = createHtmlElement("span", "", `${this.model.countCars}`);
    this.createGarageTitle();
    this.tracksContainer = createHtmlElement("div", "tracs__container", "", this.element);
    this.buttonPrev = createButton("button tracs__prev", "prev", this.model.isPrevDisabled);
    this.buttonNext = createButton("button tracs__next", "next", this.model.isNextDisabled);
    this.paginationText = createHtmlElement("div", "tracs__countPages", `${this.model.currentPage} / ${this.model.countPages}`);
    this.createPagination();
    this.setListener();
    this.model.on("updateCars", this.updateCars);
  }

  private createGarageTitle = () => {
    const garageTitle = createHtmlElement("div", "garage__title", "", this.element);
    const createCarButtons = createHtmlElement("div", "createCarButtons", "", garageTitle);
    const generateButtons = createHtmlElement("div", "generateButtons", "", createCarButtons);
    const title = createHtmlElement("p", "", "", generateButtons);
    createHtmlElement("span", "", "Cars in garage: ", title);
    title.appendChild(this.coundCars);
    generateButtons.appendChild(this.buttonGenCar);
    const createCar = createHtmlElement("div", "createCar", "", createCarButtons);
    createCar.append(this.inputName, this.inputColor, this.buttonCreateCar);
    const startResetButtons = createHtmlElement("div", "startResetButtons", "", garageTitle);
    startResetButtons.append(this.buttonReset, this.buttonStart);
  };

  private createPagination = () => {
    const el = createHtmlElement("div", "tracs__buttons", "", this.element);
    const buttons = createHtmlElement("div", "pagination__buttons", "", el);
    buttons.append(this.buttonPrev, this.paginationText, this.buttonNext);
  };

  private updateCars = () => {
    this.coundCars.innerText = `${this.model.countCars}`;
    this.paginationText.innerText = `${this.model.currentPage} / ${this.model.countPages}`;
    this.setButtonsPagination();
    this.tracksContainer.innerHTML = "";
    this.tracksContainer.append(
      ...this.model.cars.map((car) => {
        const el = new Trac(car).render();
        return el;
      })
    );
  };

  private setButtonsPagination = () => {
    this.buttonPrev.disabled = this.model.isPrevDisabled;
    this.buttonNext.disabled = this.model.isNextDisabled;
  };

  private setListener = () => {
    this.buttonCreateCar.addEventListener("click", () => this.emit("createCar", this.inputName.value, this.inputColor.value));
    this.buttonGenCar.addEventListener("click", () => this.emit("create100"));
    this.buttonPrev.addEventListener('click', () => this.emit('prevPage'));
    this.buttonNext.addEventListener('click', () => this.emit('nextPage'));
  };

  render = () => this.element;
}
