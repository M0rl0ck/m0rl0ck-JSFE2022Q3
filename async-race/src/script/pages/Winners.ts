import EventEmitter from "events";
import createHtmlElement from '../utils/createElement';

export default class Winners extends EventEmitter {
  element: HTMLElement;

  constructor() {
    super();
    this.element = createHtmlElement('div', 'winners', 'WINNERS');
  }

  render = () => this.element;
}