import EventEmitter from "events";
import createHtmlElement from '../utils/createElement';
import createButton from '../utils/createButton';
import createSvg from '../utils/createSvg';
import TracModel from './Trac-model';

type EmitsName = "start" | "stop";

export default class TracView extends EventEmitter {
  element: HTMLElement;

  id: number;

  model: InstanceType<typeof TracModel>;

  animationId: number;

  buttonStart: HTMLButtonElement;

  buttonStop: HTMLButtonElement;

  buttonEdit: HTMLButtonElement;

  buttonDelete: HTMLButtonElement;

  name: string;

  color: string;

  road: HTMLElement;

  car: HTMLElement;

  emit(event: EmitsName, data?: string) {
    return super.emit(event, data);
  }

  on(event: EmitsName, callback: (data?: string) => void) {
    return super.on(event, callback);
  }

  constructor(model:InstanceType<typeof TracModel>) {
    super();
    this.model = model;
    this.animationId = null;
    this.element = createHtmlElement('div', 'trac');
    this.buttonStart = this.createTracButton('start');
    this.buttonStart.disabled = this.model.isStartDissabled;
    this.buttonStop = this.createTracButton('stop');
    this.buttonStop.disabled = this.model.isStopDissabled;
    this.buttonEdit = this.createTracButton('edit');
    this.buttonEdit.disabled = this.model.isEditDissabled;
    this.buttonDelete = this.createTracButton('delete');
    this.buttonDelete.disabled = this.model.isDeleteDissabled;
    this.road = createHtmlElement('div', 'trac__road');
    this.car = createHtmlElement('div', 'trac__car');
    this.createTrac(this.model.car.name, this.model.car.color);
    this.buttonStart.addEventListener('click', () => this.emit('start'));
    this.buttonStop.addEventListener('click', () => this.emit('stop'));
    this.model.on('updateButtons', this.updateButtons);
  }

  private createTracButton = (innerText: string) => createButton('button button__trac', innerText, false);

  private createTrac = (name: string, color: string) => {
    const buttons = createHtmlElement('div', 'trac__buttons', '', this.element);
    const topButtons = createHtmlElement('div', 'trac__buttonsGroup', '', buttons);
    topButtons.append(this.buttonStart, this.buttonStop);
    const bottomButtons = createHtmlElement('div', 'trac__buttonsGroup', '', buttons);
    bottomButtons.append(this.buttonEdit, this.buttonDelete);
    this.element.appendChild(this.road);
    createHtmlElement('p', 'nameCar', name, this.road);
    this.road.appendChild(this.car);
    this.car.appendChild(createSvg('car', color));
  }

  private updateButtons = () => {
    this.buttonStart.disabled = this.model.isStartDissabled;
    this.buttonStop.disabled = this.model.isStopDissabled;
    this.buttonEdit.disabled = this.model.isEditDissabled;
    this.buttonDelete.disabled = this.model.isDeleteDissabled;
  }

  startAnimation = (duration: number) => {
    let currentPosition = 0;
    const distance = this.road.offsetWidth - this.car.offsetWidth;
    const offset = distance / ((duration / 1000) * 60);
    const slip = () => {
      currentPosition += offset;
      this.setStyle(currentPosition);

      if (currentPosition < distance) {
        const animationId = requestAnimationFrame(slip);
        this.setAnimationId(animationId);
      }
    };
    slip();
  };

  stopAnimation = () => {
    cancelAnimationFrame(this.animationId);
  }

  returnCar = () => {
    this.setStyle(0);
  }

  setStyle = (dX: number) => {
    this.car.style.transform = `translateX(${dX}px)`;
  }

  setAnimationId = (id: number) => {
    this.animationId = id;
  }

  render = () => this.element;
}