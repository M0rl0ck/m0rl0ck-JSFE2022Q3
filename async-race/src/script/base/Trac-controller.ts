import connector from "../utils/Connector";
import TracModel from "./Trac-model";
import TracView from "./Trac-View";
import soundStart from '../../assets/sounds/start.mp3';
import soundBreak from '../../assets/sounds/break.mp3';
import soundDrive from '../../assets/sounds/drive.mp3';

export default class TracController {
  model: InstanceType<typeof TracModel>;

  view: InstanceType<typeof TracView>;

  player: HTMLAudioElement;

  isStop: boolean;

  isSrart: boolean;

  constructor(model: InstanceType<typeof TracModel>, view: InstanceType<typeof TracView>) {
    this.model = model;
    this.view = view;
    this.isSrart = false;
    this.isStop = false;
    this.player = new Audio;
    this.player.volume = 0.4;
    this.view.on("start", this.start);
    this.view.on("stop", this.stop);
  }

  start = async () => {
    this.model.start();
    this.isSrart = false;
    this.isStop = false;
    const speed = await this.startEngine();
    this.view.startAnimation(speed);
    const driveStatus = await this.drive();
    if (driveStatus.status === 500) {
      this.view.stopAnimation();
      this.player.src = soundBreak;
      this.player.play();
    }
    if (driveStatus.result.success) {
      this.player.pause();
    }
    if (this.isStop) {
      this.model.stop();
    } else {
      this.isSrart = true;
    }
  };

  stop = async () => {
    await this.stopEngine();
    if (this.isSrart) {
      this.model.stop();
    } else {
      this.isStop = true;
    }
    
    this.player.pause();
    this.view.stopAnimation();
    this.view.returnCar();
  };

  startEngine = async () => {
    this.player.src = soundStart;
    this.player.play();
    return connector.startStopEngineCar(this.model.car.id, "started");
  }

  stopEngine = async () => connector.startStopEngineCar(this.model.car.id, "stopped");

  drive = async () => {
    this.player.src = soundDrive;
    this.player.play();
    return connector.driveCar(this.model.car.id);
  }
}
