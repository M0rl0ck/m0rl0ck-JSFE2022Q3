import EventEmitter from "events";
import { CARSMODEL, CARSNAME, LIMITCAR } from "../../constants/constants";
import ICar from '../../infostructure/ICar';
import connector from '../../utils/Connector';

type EmitsName = 'updateCars';

export default class GarageModel extends EventEmitter {
  cars: ICar[];

  countCars: number;

  isEdit: boolean;

  editId: number;

  currentPage: number;

  countPages: number;

  isPrevDisabled: boolean;

  isNextDisabled: boolean;

  emit(event: EmitsName, data?: string) {
    return super.emit(event, data);
  }

  on(event: EmitsName, callback: (data?: string) => void) {
    return super.on(event, callback);
  }

  constructor() {
    super();
    this.cars = [];
    this.countCars = 0;
    this.isEdit = false;
    this.editId = 0;
    this.currentPage = 1;
    this.countPages = 1;
    this.isPrevDisabled = true;
    this.isNextDisabled = true;
    this.getCars();
  }

  private getCars = async () => {
    const { items, count } = await connector.getCars(this.currentPage, LIMITCAR.cars);
    this.cars = items;
    this.countCars = Number(count);
    this.countPages = Math.ceil(this.countCars / LIMITCAR.cars);
    this.setButtonsPagination();
    this.emit('updateCars');
  }

  private setButtonsPagination = () => {
    if (this.currentPage <= 1) {
      this.isPrevDisabled = true;
    } else {
      this.isPrevDisabled = false;
    }

    if (this.currentPage >= this.countPages) {
      this.isNextDisabled = true;
    } else {
      this.isNextDisabled = false;
    }
  }

  createCar = async (name: string, color: string) => {
    await connector.createCar({name, color});
    this.getCars();
  }

  createCars = async () => {
    for (let i = 0; i < 100; i += 1) {
      const color = `#${Math.floor(Math.random() * 0xFFFFFF).toString(16)}`;
      const name = `${CARSNAME[Math.floor(Math.random() * CARSNAME.length)]
      } ${CARSMODEL[Math.floor(Math.random() * CARSMODEL.length)]}`;
      this.createCar(name, color);
    }
  }

  nextPage = () => {
    if (this.currentPage < this.countPages) {
      this.currentPage += 1;
      this.getCars();
    }
  }
 
  prevPage = () => {
    if (this.currentPage > 1) {
      this.currentPage -= 1;
      this.getCars();
    }
  }
}