import createHtmlElement from '../function/function';

export default class Main {
  constructor() {
    const el = createHtmlElement('main', 'main', '', document.body);
    this.wrapper = createHtmlElement('div', 'wrapper main__wrapper', '', el)
  }
}