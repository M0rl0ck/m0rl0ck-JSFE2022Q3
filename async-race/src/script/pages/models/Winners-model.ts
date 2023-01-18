import { DEFAULTCAR, LIMITCAR } from "../../constants/constants";
import ICar from "../../infostructure/ICar";
import IWinnerCar from "../../infostructure/IWinnerCar";
import IWinnerRequest from "../../infostructure/IWinnerRequest";
import { Sort, Order } from '../../infostructure/types';
import connector from "../../utils/Connector";
import Model from "./Model";

export default class WinnersModel extends Model {
  cars: IWinnerRequest[];

  winners: IWinnerCar[];

  sort: Sort;

  order: Order;

  constructor() {
    super();
    this.winners = [];
    this.limitCars = LIMITCAR.wins;
    this.sort = 'id';
    this.order = 'ASC';
    this.getCars();
  }

  getCars = async (sort: Sort = this.sort, order: Order = this.order) => {
    const { items, count } = await connector.getWinnersCars(this.currentPage, LIMITCAR.wins, sort, order);
    this.cars = items;
    this.updateItemsCars(Number(count));
    this.winners = await this.getWinnersProp(this.currentPage);
    this.emit("updateCars");
  };

  getWinnersProp = async (numPage: number) => {
    const winners: IWinnerCar[] = [];
    const promises: Promise<ICar[]>[] = [];
    this.cars.map(async (win) => {
      const id = win.id ? win.id : DEFAULTCAR.id;
      const cars = connector.getCar(id);

      promises.push(cars);
    });

    let cars = await Promise.all(promises);
    cars = cars.filter(el => el.length);
    if (cars.length < this.cars.length) {
      this.cars.forEach(el => {
        if (!cars.find(element => {
          const [car] = element;
          return car.id === el.id
        })) {
          connector.deleteWinnersCar(el.id);
        }
      })
      this.getCars();
    }
    cars.forEach((winner, index) => {
      const [car] = winner;
      const win = this.cars.find(el => el.id === car?.id);
      if (car) {
        const result: IWinnerCar = {
        id: car.id || DEFAULTCAR.id,
        num: (numPage - 1) * LIMITCAR.wins + index + 1,
        fill: car.color || DEFAULTCAR.color,
        name: car.name || DEFAULTCAR.name,
        wins: win.wins || DEFAULTCAR.win,
        time: win.time || DEFAULTCAR.time,
      };
      winners.push(result)
      }
    });
    return winners;
  };

  deleteCar = async (id: number) => {
    await connector.deleteWinnersCar(id);
    this.getCars();
  };

  sortWinners = (name: Sort) => {
    if (name === this.sort) {
      this.order = this.order === 'ASC' ? 'DESC' : 'ASC';
    } else {
      this.sort = name;
      this.order = 'ASC';
    }
    this.getCars(this.sort, this.order);
    this.emit('updateColumnsName');
  }
}
