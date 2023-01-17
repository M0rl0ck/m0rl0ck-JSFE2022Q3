import EventEmitter from "events";
import Trac from '../../base/Trac';
import createButton from '../../utils/createButton';
import createHtmlElement from '../../utils/createElement';
import GarageModel from '../models/Garage-model';
import WinnersModel from "../models/Winners-model";

type GarageModelType = InstanceType<typeof GarageModel>;
type WinnersModelType = InstanceType<typeof WinnersModel>;
type TracType = InstanceType<typeof Trac>;
type EmitsName = "createCar" | "create100" | "nextPage" | "prevPage" | "editCar" | "deleteCar" | "sort" | "prevPage" | "nextPage";

export default abstract class View extends EventEmitter {
  element: HTMLElement;

  model: GarageModelType | WinnersModelType;
  
  countCars: HTMLElement;

  buttonPrev: HTMLButtonElement;

  buttonNext: HTMLButtonElement;

  paginationText: HTMLElement;

  emit(event: EmitsName, name?: string | number | TracType, color?: string) {
    return super.emit(event, name, color);
  }

  on(event: EmitsName, callback: ((name?: string | number, color?: string) => void) | ((trac: TracType) => void)) {
    return super.on(event, callback);
  }

  constructor(model: GarageModelType | WinnersModelType) {
    super();
    this.model = model;
    this.countCars = createHtmlElement("span", "", `${this.model.countCars}`);
    this.buttonPrev = createButton("button tracs__prev", "prev", this.model.isPrevDisabled);
    this.buttonNext = createButton("button tracs__next", "next", this.model.isNextDisabled);
    this.paginationText = createHtmlElement("div", "tracs__countPages", `${this.model.currentPage} / ${this.model.countPages}`);
    this.buttonPrev.addEventListener("click", () => this.emit("prevPage"));
    this.buttonNext.addEventListener("click", () => this.emit("nextPage"));
  }

  protected setButtonsPagination = () => {
    this.buttonPrev.disabled = this.model.isPrevDisabled;
    this.buttonNext.disabled = this.model.isNextDisabled;
  };

  render = () => this.element;
}
