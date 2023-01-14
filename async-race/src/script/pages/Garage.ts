import EventEmitter from "events";
import createHtmlElement from '../utils/createElement';

export default class Garage extends EventEmitter {
  element: HTMLElement;

  constructor() {
    super();
    this.element = createHtmlElement('div', 'garage', 'GARAGE');
  }

  render = () => this.element;
}