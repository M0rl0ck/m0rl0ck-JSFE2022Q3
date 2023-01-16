import EventEmitter from "events";
import WinnersModel from './models/Winners-model';
import WinnersView from './views/Winners-view';

type WinnersViewType = InstanceType<typeof WinnersView>;
type WinnersModelType = InstanceType<typeof WinnersModel>;

export default class Winners extends EventEmitter {
  element: HTMLElement;

  view: WinnersViewType;

  model: WinnersModelType;

  constructor() {
    super();
    this.model = new WinnersModel();
    this.view = new WinnersView(this.model);
    this.element = this.view.render();
  }

  render = () => this.element;
}