import EventEmitter from "events";
import createButton from "../../utils/createButton";
import createHtmlElement from "../../utils/createElement";
import createInputElement from "../../utils/createInputElement";
import GarageModel from "../models/Garage-model";
import Trac from "../../base/Trac";
import createPagination from '../../utils/createPagination';

type EmitsName = "createCar" | "create100" | "nextPage" | "prevPage" | "editCar" | "deleteCar";
type TracType = InstanceType<typeof Trac>;
type GarageModelType = InstanceType<typeof GarageModel>;

enum CreateButton {
  Create = 'Create new car',
  Edit = 'Edit car',
}

export default class GarageView extends EventEmitter {
  model: GarageModelType;

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

  emit(event: EmitsName, name?: string | number | TracType, color?: string) {
    return super.emit(event, name, color);
  }

  on(event: EmitsName, callback: ((name?: string | number, color?: string) => void) | ((trac: TracType) => void)) {
    return super.on(event, callback);
  }

  constructor(model: GarageModelType) {
    super();
    this.model = model;
    this.element = createHtmlElement("div", "garage");
    this.buttonGenCar = createButton("button button__generateCars", "Generate 100 cars");
    this.buttonCreateCar = createButton("button button__newCar", CreateButton.Create);
    this.buttonReset = createButton("button returnCars", "Reset", true);
    this.buttonStart = createButton("button startCars", "Start");
    this.inputName = createInputElement("inputText", "text");
    this.inputName.value = this.model.nameCar;
    this.inputColor = createInputElement("inputColor", "color");
    this.inputColor.value = this.model.colorCar;
    this.coundCars = createHtmlElement("span", "", `${this.model.countCars}`);
    this.createGarageTitle();
    this.tracksContainer = createHtmlElement("div", "tracs__container", "", this.element);
    this.buttonPrev = createButton("button tracs__prev", "prev", this.model.isPrevDisabled);
    this.buttonNext = createButton("button tracs__next", "next", this.model.isNextDisabled);
    this.paginationText = createHtmlElement("div", "tracs__countPages", `${this.model.currentPage} / ${this.model.countPages}`);
    this.element.appendChild(createPagination('tracs', this.buttonPrev, this.paginationText, this.buttonNext));
    this.setListener();
    this.model.on("updateCars", this.updateCars);
    this.model.on('updateButtons', this.updateButtons);
    this.model.on('updateImput', this.updateInput);
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

  private updateCars = () => {
    this.coundCars.innerText = `${this.model.countCars}`;
    this.paginationText.innerText = `${this.model.currentPage} / ${this.model.countPages}`;
    this.setButtonsPagination();
    this.tracksContainer.innerHTML = "";
    this.tracksContainer.append(
      ...this.model.cars.map((car) => {
        const trac = new Trac(car);
        trac.buttonEdit.addEventListener('click', () => this.emit('editCar', trac));
        trac.buttonDelete.addEventListener('click', () => this.emit('deleteCar', trac.id));
        return trac.render();
      })
    );
  };

  private updateButtons = () => {
    this.buttonCreateCar.innerText = this.model.isEdit ? CreateButton.Edit : CreateButton.Create;
    this.buttonGenCar.disabled = this.model.isGenCarsDisabled;
  }

  private updateInput = () => {
    this.inputName.value = this.model.nameCar;
    this.inputColor.value = this.model.colorCar;
  }

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
