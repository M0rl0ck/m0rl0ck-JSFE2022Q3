import createHtmlElement from '../function/function';

export default class Header {
  constructor() {
    const el = createHtmlElement('header', 'header', '', document.body);
    const wrapper = createHtmlElement('div', 'wrapper header__wrapper', '', el)
    createHtmlElement('div', 'header__logo', '', wrapper);
    this.nav = createHtmlElement('nav', 'nav', '', wrapper);
    const scoreContainer = createHtmlElement('div', 'scoreContainer', '', wrapper);
    this.score = createHtmlElement('p', '', 'Очки: ', scoreContainer);
    this.scoreNum = createHtmlElement('span', 'scoreNum', '0', scoreContainer);
    this.buttonMain = this.createButton('main', 'Главная');
    this.buttonGaim = this.createButton('gaim', 'Игра');
    this.buttonSlaider = this.createButton('slaider', 'Слайдер');
    this.lang = createHtmlElement('div', 'lang', '', wrapper);
    this.langRu = createHtmlElement('span', 'lang lang_active', 'Рус', this.lang);
    createHtmlElement('span', '', ' / ', this.lang);
    this.langEn = createHtmlElement('span', 'lang', 'Анг', this.lang);
  }

  createButton(className, name) {
    const button = createHtmlElement('div', `button header__button header__button_${className}`, name, this.nav);
  }
}