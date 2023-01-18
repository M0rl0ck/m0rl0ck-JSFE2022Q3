import TracModel from '../../base/Trac-model';
import { Sort } from '../../infostructure/types';
import Garage from "../Garage";
import Winners from "../Winners";

type GarageType = InstanceType<typeof Garage>;
type TracModelType = InstanceType<typeof TracModel>;
type WinnersType = InstanceType<typeof Winners>;

export default class Controller {
  garage: Garage;

  winners: Winners;

  constructor(garage: GarageType, winners: WinnersType) {
    this.garage = garage;
    this.winners = winners;
    this.garage.view.on("createCar", (name: string, color) => this.garage.model.createCar(name, color));
    this.garage.view.on("create100", () => this.garage.model.createCars());
    this.garage.view.on("prevPage", () => this.garage.model.prevPage());
    this.garage.view.on("nextPage", () => this.garage.model.nextPage());
    this.garage.view.on("editCar", (trac: TracModelType) => this.garage.model.setEditCar(trac));
    this.garage.model.on('updateWinners', this.winners.model.getCars);
    this.garage.view.on("deleteCar", (id: number) => {
      this.garage.model.deleteCar(id);
      this.winners.model.deleteCar(id);
    });
    this.winners.view.on('sort', (name: Sort) => this.winners.model.sortWinners(name));
    this.winners.view.on("prevPage", () => this.winners.model.prevPage());
    this.winners.view.on("nextPage", () => this.winners.model.nextPage());
  }
}
