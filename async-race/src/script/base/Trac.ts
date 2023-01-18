import ICar from "../infostructure/ICar";
import TracController from './Trac-controller';
import TracModel from "./Trac-model";
import TracView from "./Trac-View";

export default class Trac {
  model: InstanceType<typeof TracModel>;

  view: InstanceType<typeof TracView>;

  element: HTMLElement;

  controller: InstanceType<typeof TracController>;

  constructor(car: ICar) {
    this.model = new TracModel(car);
    this.view = new TracView(this.model);
    this.controller = new TracController(this.model, this.view)
    this.element = this.view.render();
  }

  render = () => this.element;
}
