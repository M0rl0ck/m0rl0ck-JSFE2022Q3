import createHtmlElement from '../utils/createElement';

export default class ModalPage {
  element: HTMLElement;

  title: HTMLElement;

  constructor() {
    this.element = createHtmlElement('div', 'modal-page');
    this.title = createHtmlElement('h1', 'modal-title', '', this.element);
    this.element.addEventListener('click', this.hide);
  }

  show = (name: string, time: number) => {
    this.title.innerText = `${name} wont first ${time}s!`
    document.body.append(this.element);
  }

  hide = () => {
    this.element.remove();
  }
}