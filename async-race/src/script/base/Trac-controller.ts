import connector from "../utils/Connector";
import TracModel from "./Trac-model";
import TracView from "./Trac-View";
import soundStart from '../../assets/sounds/start.mp3';
import soundBreak from '../../assets/sounds/break.mp3';
import soundDrive from '../../assets/sounds/drive.mp3';
import IStatusDrive from '../infostructure/IStatusDrive';

type DriveStatus = {
  result: IStatusDrive;
  status: number;
}

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
    this.view.on("start", this.startCar);
    this.view.on("stop", this.stop);
  }

  startCar = async () => {
    this.preStart();
    const speed = await this.startEngine();
    this.startAnimation(speed);
    this.drive();
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

  preStart = () => {
    this.model.start();
    this.isSrart = false;
    this.isStop = false;
  }

  startAnimation = (speed: number) => {
    this.view.startAnimation(speed);
    this.model.speed = speed;
    this.player.src = soundDrive;
    setTimeout(() => this.player.play(), Math.random() * 600);
    ;
  }

  startEngine = async () => {
    this.player.src = soundStart;
    setTimeout(() => this.player.play(), Math.random() * 600);
    return connector.startStopEngineCar(this.model.car.id, "started");
}

  stopEngine = async () => connector.startStopEngineCar(this.model.car.id, "stopped");

  drive = async () => {
    const driveStatus = await connector.driveCar(this.model.car.id);
    const {id, speed} = this.model;
    this.stopDrive(driveStatus);
    return { driveStatus, id, speed};
  }

  stopDrive = (driveStatus: DriveStatus) => {
    if (driveStatus.status === 500) {
      this.view.stopAnimation();
      this.player.src = soundBreak;
      if (!this.isStop) {
        this.player.play();
      }
    }
    if (driveStatus.result.success) {
      this.player.pause();
    }
    if (this.isStop) {
      this.model.stop();
    } else {
      this.isSrart = true;
    }
  }
}
