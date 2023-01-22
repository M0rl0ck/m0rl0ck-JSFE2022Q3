import EventEmitter from "events";
import GarageModel from "./models/Garage-model";
import GarageView from "./views/Garage-view";

type GarageViewType = InstanceType<typeof GarageView>;

export default class Garage extends EventEmitter {
  element: HTMLElement;

  view: GarageViewType;

  model: GarageModel;

  constructor() {
    super();
    this.model = new GarageModel();
    this.view = new GarageView(this.model);
    this.element = this.view.render();
  }

  render = () => this.element;
}
