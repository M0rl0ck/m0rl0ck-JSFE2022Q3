import createButton from "../../utils/createButton";
import createHtmlElement from "../../utils/createElement";
import createInputElement from "../../utils/createInputElement";
import GarageModel from "../models/Garage-model";
import createPagination from "../../utils/createPagination";
import View from "./view";

type GarageModelType = InstanceType<typeof GarageModel>;

enum CreateButton {
  Create = "Create new car",
  Edit = "Edit car",
}

export default class GarageView extends View {
  model: GarageModelType;

  buttonGenCar: HTMLButtonElement;

  buttonStart: HTMLButtonElement;

  buttonCreateCar: HTMLButtonElement;

  buttonReset: HTMLButtonElement;

  inputName: HTMLInputElement;

  inputColor: HTMLInputElement;

  tracksContainer: HTMLElement;

  constructor(model: GarageModelType) {
    super(model);
    this.element = createHtmlElement("div", "garage");
    this.buttonGenCar = createButton("button button__generateCars", "Generate 100 cars");
    this.buttonCreateCar = createButton("button button__newCar", CreateButton.Create);
    this.buttonReset = createButton("button returnCars", "Reset", true);
    this.buttonStart = createButton("button startCars", "Start");
    this.inputName = createInputElement("inputText", "text");
    this.inputName.value = this.model.nameCar;
    this.inputColor = createInputElement("inputColor", "color");
    this.inputColor.value = this.model.colorCar;
    this.createGarageTitle();
    this.tracksContainer = createHtmlElement("div", "tracs__container", "", this.element);
    this.element.appendChild(createPagination("tracs", this.buttonPrev, this.paginationText, this.buttonNext));
    this.setListener();
    this.model.on("updateCars", this.updateCars);
    this.model.on("updateButtons", this.updateButtons);
    this.model.on("updateImput", this.updateInput);
  }

  private createGarageTitle = () => {
    const garageTitle = createHtmlElement("div", "garage__title", "", this.element);
    const createCarButtons = createHtmlElement("div", "createCarButtons", "", garageTitle);
    const generateButtons = createHtmlElement("div", "generateButtons", "", createCarButtons);
    const title = createHtmlElement("p", "", "", generateButtons);
    createHtmlElement("span", "", "Cars in garage: ", title);
    title.appendChild(this.countCars);
    generateButtons.appendChild(this.buttonGenCar);
    const createCar = createHtmlElement("div", "createCar", "", createCarButtons);
    createCar.append(this.inputName, this.inputColor, this.buttonCreateCar);
    const startResetButtons = createHtmlElement("div", "startResetButtons", "", garageTitle);
    startResetButtons.append(this.buttonReset, this.buttonStart);
  };

  private updateCars = () => {
    this.countCars.innerText = `${this.model.countCars}`;
    this.paginationText.innerText = `${this.model.currentPage} / ${this.model.countPages}`;
    this.setButtonsPagination();
    this.tracksContainer.innerHTML = "";
    this.tracksContainer.append(
      ...this.model.tracs.map((trac) => {
        trac.view.buttonEdit.addEventListener("click", () => this.emit("editCar", trac.model));
        trac.view.buttonDelete.addEventListener("click", () => this.emit("deleteCar", trac.view.id));
        return trac.render();
      })
    );
  };

  private updateButtons = () => {
    this.buttonCreateCar.innerText = this.model.isEdit ? CreateButton.Edit : CreateButton.Create;
    this.buttonGenCar.disabled = this.model.isGenCarsDisabled;
  };

  private updateInput = () => {
    this.inputName.value = this.model.nameCar;
    this.inputColor.value = this.model.colorCar;
  };

  private setListener = () => {
    this.buttonCreateCar.addEventListener("click", () => this.emit("createCar", this.inputName.value, this.inputColor.value));
    this.buttonGenCar.addEventListener("click", () => this.emit("create100"));
  };

}
