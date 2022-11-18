import createHtmlElement from '../../function/function';

export default class Galerry {
  constructor() {
    this.container = createHtmlElement('section', 'gallery-container', 'Галерея');
    this.container.style.display =  'none';
  }
}