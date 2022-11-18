import createHtmlElement from '../../function/function';

export default class MainPage {
  constructor() {
    this.container = createHtmlElement('section', 'main-page', 'Главная страница');
  }
}