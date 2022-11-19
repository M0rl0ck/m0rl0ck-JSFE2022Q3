import createHtmlElement from '../../function/function';
import dataMainPage from '../../data/dataMainPage';

export default class MainPage {
  constructor(lang, observer) {
    this.lang = lang;
    this.observer = observer;
    this.container = createHtmlElement('section', 'main-page');
    this.header = createHtmlElement('h2', 'main-page__header', dataMainPage.header[this.lang], this.container);
    createHtmlElement('div', 'logo', '', this.container);
    this.text1 = createHtmlElement('p', 'main-page__text', dataMainPage.text1[this.lang], this.container);
    this.text2 = createHtmlElement('p', 'main-page__text', dataMainPage.text2[this.lang], this.container);
    this.button = createHtmlElement('div', 'button button_main-page', dataMainPage.button[this.lang], this.container);

    this.button.addEventListener("click", () => this.observer.startEvents("newGame"));
    this.observer.addEvent("changeLang", this.changeLang);
  }

  changeLang = (lang) => {
    this.lang = lang;
    this.header.innerHTML = dataMainPage.header[this.lang];
    this.text1.innerHTML = dataMainPage.text1[this.lang];
    this.text2.innerHTML = dataMainPage.text2[this.lang];
    this.button.innerHTML = dataMainPage.button[this.lang];
  }
}