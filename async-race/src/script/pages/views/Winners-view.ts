import createHtmlElement from "../../utils/createElement";
import createPagination from "../../utils/createPagination";
import createSvg from "../../utils/createSvg";
import WinnersModel from "../models/Winners-model";
import View from "./view";

type WinnersModelType = InstanceType<typeof WinnersModel>;

enum WinColumn {
  Default = "Wins number",
  ABC = "Wins number ↓",
  DESC = "Wins number ↑",
}
enum TimeColumn {
  Default = "Best time",
  ABC = "Best time ↓",
  DESC = "Best time ↑",
}

export default class WinnersView extends View {
  model: WinnersModelType;

  columnNumber: HTMLElement;

  columnTime: HTMLElement;

  table: HTMLElement;

  winColumn: HTMLElement;

  timeColumn: HTMLElement;

  constructor(model: WinnersModelType) {
    super(model);
    this.element = createHtmlElement("div", "winners");
    this.table = createHtmlElement("div", "winners__table");
    const { winText, timeText } = this.getColumnsName();
    this.winColumn = createHtmlElement("div", "winners__wins cursor", `${winText}`);
    this.timeColumn = createHtmlElement("div", "winners__time cursor", `${timeText}`);
    this.createWinners();
    this.model.on("updateCars", this.updateCars);
    this.model.on("updateColumnsName", this.setColumnsName);
    this.winColumn.addEventListener("click", () => this.emit("sort", "wins"));
    this.timeColumn.addEventListener("click", () => this.emit("sort", "time"));
  }

  private getColumnsName = () => {
    let winText: string;
    let timeText: string;
    if (this.model.sort === "wins") {
      winText = this.model.order === "ASC" ? WinColumn.ABC : WinColumn.DESC;
    } else {
      winText = WinColumn.Default;
    }
    if (this.model.sort === "time") {
      timeText = this.model.order === "ASC" ? TimeColumn.ABC : TimeColumn.DESC;
    } else {
      timeText = TimeColumn.Default;
    }
    return { winText, timeText };
  };

  setColumnsName = () => {
    const { winText, timeText } = this.getColumnsName();
    this.winColumn.innerText = winText;
    this.timeColumn.innerText = timeText;
  };

  private createWinners = () => {
    createHtmlElement("h2", "", "Winners", this.element);
    const container = createHtmlElement("div", "winners__container", "", this.element);
    const title = createHtmlElement("p", "", "", container);
    createHtmlElement("span", "", "Total winners: ", title);
    title.appendChild(this.countCars);
    container.appendChild(this.table);
    container.appendChild(createPagination("winners", this.buttonPrev, this.paginationText, this.buttonNext));
    this.createTableTitle();
  };

  private createTableTitle = () => {
    createHtmlElement("div", "winners__number", "№", this.table);
    createHtmlElement("div", "winners__img", "Car", this.table);
    createHtmlElement("div", "winners__name", "Name", this.table);
    this.table.append(this.winColumn, this.timeColumn);
  };

  private updateCars = () => {
    this.countCars.innerText = `${this.model.countCars}`;
    this.paginationText.innerText = `${this.model.currentPage} / ${this.model.countPages}`;
    this.setButtonsPagination();
    this.table.innerHTML = "";
    this.createTableTitle();
    this.model.winners.forEach((winner) => {
      createHtmlElement("div", "winners__number", `${winner.num}`, this.table);
      const svg = createHtmlElement("div", "winners__img", "", this.table);
      svg.appendChild(createSvg("car", winner.fill));
      createHtmlElement("div", "winners__name", `${winner.name}`, this.table);
      createHtmlElement("div", "winners__wins", `${winner.wins}`, this.table);
      createHtmlElement("div", "winners__time", `${winner.time}`, this.table);
    });
  };
}
