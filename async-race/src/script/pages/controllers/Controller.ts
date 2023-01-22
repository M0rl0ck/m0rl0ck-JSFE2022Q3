import Trac from "../../base/Trac";
import TracModel from "../../base/Trac-model";
import IStatusDrive from "../../infostructure/IStatusDrive";
import IWinnerRequest from "../../infostructure/IWinnerRequest";
import { Sort } from "../../infostructure/types";
import connector from "../../utils/Connector";
import Garage from "../Garage";
import ModalPage from "../ModalPage";
import Winners from "../Winners";

type GarageType = InstanceType<typeof Garage>;
type TracModelType = InstanceType<typeof TracModel>;
type WinnersType = InstanceType<typeof Winners>;
type PromiceWinners = {
  driveStatus: {
    result: IStatusDrive;
    status: number;
  };
  id: number;
  name: string;
  speed: number;
};

export default class Controller {
  garage: Garage;

  winners: Winners;

  isStop: boolean;

  modal: ModalPage;

  constructor(garage: GarageType, winners: WinnersType) {
    this.garage = garage;
    this.winners = winners;
    this.modal = new ModalPage();
    this.isStop = false;
    this.garage.view.on("createCar", (name: string, color) => this.garage.model.createCar(name, color));
    this.garage.view.on("create100", () => this.garage.model.createCars());
    this.garage.view.on("prevPage", () => this.garage.model.prevPage());
    this.garage.view.on("nextPage", () => this.garage.model.nextPage());
    this.garage.view.on("editCar", (trac: TracModelType) => this.garage.model.setEditCar(trac));
    this.garage.model.on("updateWinners", this.winners.model.getCars);
    this.garage.view.on("deleteCar", (id: number) => {
      this.garage.model.deleteCar(id);
      this.winners.model.deleteCar(id);
    });
    this.garage.view.on("startRace", () => this.startRace());
    this.garage.view.on("stopRace", () => this.stopRace());

    this.winners.view.on("sort", (name: Sort) => this.winners.model.sortWinners(name));
    this.winners.view.on("prevPage", () => this.winners.model.prevPage());
    this.winners.view.on("nextPage", () => this.winners.model.nextPage());
  }

  startRace = async () => {
    this.isStop = false;
    this.garage.model.startRace();
    const tracs = [...this.garage.model.tracs];
    const promiseSpeeds = tracs.map((trac) => {
      trac.controller.preStart();
      return trac.controller.startEngine();
    });
    const speeds = await Promise.all(promiseSpeeds);
    const promiseWinners = tracs.map((trac, index) => {
      trac.controller.startAnimation(speeds[index]);
      return trac.controller.drive();
    });
    const winner = await this.getWinner(promiseWinners, tracs);
    if (this.isStop) {
      return;
    }
    if (winner && winner.id) {
      this.modal.show(winner.name, winner.time);
      this.updateWinners(winner);
    }
  };

  updateWinners = async (winner: IWinnerRequest) => {
    const { items } = await connector.getWinnersCar(winner.id);
    const [item] = [...items];
    if (!(item && item.id)) {
      await connector.createWinnersCar(winner);
    } else {
      const body = {
        id: winner.id,
        wins: item.wins + 1,
        time: winner.time <= item.time ? winner.time : item.time,
      };
      await connector.updateWinnersCar(winner.id, body);
    }
    this.winners.model.getCars();
  };

  getWinner = async (promiseWinners: Promise<PromiceWinners>[], tracs: Trac[]): Promise<{ id: number; name: string; time: number }> => {
    const { driveStatus, id, name, speed } = await Promise.race(promiseWinners);
    if (!driveStatus.result.success) {
      const failIndex = tracs.findIndex((trac) => trac.model.id === id);
      const nextPromiseWinners = [...promiseWinners.slice(0, failIndex), ...promiseWinners.slice(failIndex + 1)];
      const nextTracs = [...tracs.slice(0, failIndex), ...tracs.slice(failIndex + 1)];
      return this.getWinner(nextPromiseWinners, nextTracs);
    }
    return { id, name, time: Number((speed / 1000).toFixed(2)) };
  };

  stopRace = () => {
    this.isStop = true;
    this.garage.model.stopRace();
    this.garage.model.tracs.forEach((trac) => {
      trac.controller.stop();
    });
  };
}
