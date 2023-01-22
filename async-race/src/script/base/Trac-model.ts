import EventEmitter from "events";
import ICar from "../infostructure/ICar";

type EmitsName = "updateButtons" | "preStart" | "startAnimation" | "stopAnimation" | "returnCar";

export default class TracModel extends EventEmitter {
  isStartDissabled: boolean;

  isStopDissabled: boolean;

  isEditDissabled: boolean;

  isDeleteDissabled: boolean;

  car: ICar;

  speed: number;

  id: number;

  name: string;

  emit(event: EmitsName, data?: number) {
    return super.emit(event, data);
  }

  on(event: EmitsName, callback: (data?: number) => void) {
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

  preStart = () => {
    this.isStartDissabled = true;
    this.isStopDissabled = false;
    this.isEditDissabled = true;
    this.isDeleteDissabled = true;
    this.emit("preStart");
  };

  startAnimation = (speed: number) => {
    this.speed = speed;
    this.emit("startAnimation", speed);
  };

  stopAnimation = () => {
    this.emit("stopAnimation");
  };

  preStop = () => {
    this.isStopDissabled = true;
    this.emit("updateButtons");
  };

  stop = () => {
    this.isStartDissabled = false;
    this.isEditDissabled = false;
    this.isDeleteDissabled = false;
    this.emit("updateButtons");
  };

  returnCar = () => {
    this.emit("returnCar");
  };
}
