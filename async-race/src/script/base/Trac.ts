import createHtmlElement from '../utils/createElement';
import createButton from '../utils/createButton';
import ICar from '../infostructure/ICar';
import createSvg from '../utils/createSvg';

export default class Trac {
  element: HTMLElement;

  id: number;

  buttonStart: HTMLButtonElement;

  buttonStop: HTMLButtonElement;

  buttonEdit: HTMLButtonElement;

  buttonDelete: HTMLButtonElement;

  constructor(car: ICar) {
    this.id = car.id;
    this.element = createHtmlElement('div', 'trac');
    this.buttonStart = this.createTracButton('start');
    this.buttonStop = this.createTracButton('stop');
    this.buttonEdit = this.createTracButton('edit');
    this.buttonDelete = this.createTracButton('delete');
    this.createTrac(car.name, car.color);
  }

  private createTracButton = (innerText: string) => createButton('button button__trac', innerText, false);

  private createTrac = (name: string, color: string) => {
    const buttons = createHtmlElement('div', 'trac__buttons', '', this.element);
    const topButtons = createHtmlElement('div', 'trac__buttonsGroup', '', buttons);
    topButtons.append(this.buttonStart, this.buttonStop);
    const bottomButtons = createHtmlElement('div', 'trac__buttonsGroup', '', buttons);
    bottomButtons.append(this.buttonEdit, this.buttonDelete);
    const road = createHtmlElement('div', 'trac__road', '', this.element);
    createHtmlElement('p', 'nameCar', name, road);
    const car = createHtmlElement('div', 'trac__car', '', road);
    car.appendChild(createSvg('car', color));
  }

  render = () => this.element;
}