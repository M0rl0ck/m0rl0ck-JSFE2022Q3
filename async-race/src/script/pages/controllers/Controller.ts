import Trac from '../../base/Trac';
import Garage from '../Garage'
// import GarageModel from '../models/Garage-model'
// import GarageView from '../views/Garage-view'
import Winners from '../Winners'

type GarageType = InstanceType<typeof Garage>;
type TracType = InstanceType<typeof Trac>;
// type GarageViewType = InstanceType<typeof GarageView>
// type GarageModelType = InstanceType<typeof GarageModel>
type WinnersType = InstanceType<typeof Winners>

export default class Controller {
  garage: Garage

  winners: Winners

  constructor(garage: GarageType, winners: WinnersType) {
    this.garage = garage;
    this.winners = winners;
    this.garage.view.on('createCar', (name: string, color) => this.garage.model.createCar(name, color))
    this.garage.view.on('create100', () => this.garage.model.createCars());
    this.garage.view.on('prevPage', () => this.garage.model.prevPage());
    this.garage.view.on('nextPage', () => this.garage.model.nextPage());
    this.garage.view.on('editCar', (trac: TracType) => this.garage.model.setEditCar(trac));
    this.garage.view.on('deleteCar', (id: number) => this.garage.model.deleteCar(id))
  }
}