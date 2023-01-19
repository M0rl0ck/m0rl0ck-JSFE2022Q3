import EventEmitter from "events";
import ICar from '../infostructure/ICar';

type EmitsName = "updateButtons";

export default class TracModel extends EventEmitter {
  isStartDissabled: boolean;

  isStopDissabled: boolean;

  isEditDissabled: boolean;

  isDeleteDissabled: boolean;

  car: ICar;

  speed: number;

  id: number;

  name: string;

  emit(event: EmitsName, data?: string) {
    return super.emit(event, data);
  }

  on(event: EmitsName, callback: (data?: string) => void) {
    return super.on(event, callback);
  }

  constructor(car: ICar) {
    super();
    this.car = car;
    this.id = car.id;
    this.name = car.name;
    this.speed = 0;
    this.isStartDissabled = false;
    this.isStopDissabled = true;
    this.isEditDissabled = false;
    this.isDeleteDissabled = false;
  }

  start = () => {
    this.isStartDissabled = true;
    this.isStopDissabled = false;
    this.isEditDissabled = true;
    this.isDeleteDissabled = true;
    this.emit('updateButtons');
  }

  stop = () => {
    this.isStartDissabled = false;
    this.isStopDissabled = true;
    this.isEditDissabled = false;
    this.isDeleteDissabled = false;
    this.emit('updateButtons');
  }
}