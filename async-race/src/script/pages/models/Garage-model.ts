import EventEmitter from "events";
import Trac from "../../base/Trac";
import { CARSMODEL, CARSNAME, DEFAULTCAR, LIMITCAR } from "../../constants/constants";
import ICar from "../../infostructure/ICar";
import connector from "../../utils/Connector";

type EmitsName = "updateCars" | "updateButtons" | "updateImput";
type TracType = InstanceType<typeof Trac>;

export default class GarageModel extends EventEmitter {
  cars: ICar[];

  countCars: number;

  isEdit: boolean;

  editId: number;

  currentPage: number;

  countPages: number;

  isGenCarsDisabled: boolean;

  isCreateCarDisabled: boolean;

  isResetDisabled: boolean;

  isStartDisabled: boolean;

  isPrevDisabled: boolean;

  isNextDisabled: boolean;

  nameCar: string;

  colorCar: string;

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
    this.nameCar = DEFAULTCAR.name;
    this.colorCar = DEFAULTCAR.color;
    this.isGenCarsDisabled = false;
    this.isCreateCarDisabled = false;
    this.isResetDisabled = true;
    this.isStartDisabled = false;
    this.isPrevDisabled = true;
    this.isNextDisabled = true;
    this.getCars();
  }

  private getCars = async () => {
    const { items, count } = await connector.getCars(this.currentPage, LIMITCAR.cars);
    this.cars = items;
    this.updateItemsCars(Number(count));
    this.emit("updateCars");
  };

  updateItemsCars = (countCars: number) => {
    this.countCars = countCars;
    this.countPages = Math.ceil(this.countCars / LIMITCAR.cars);
    if (this.currentPage > this.countPages && this.currentPage > 1) {
      this.currentPage = this.countPages;
      this.getCars();
    }
    this.setButtonsPagination();
  };

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
  };

  createCar = async (name: string, color: string) => {
    if (this.isEdit) {
      await connector.updateCar(this.editId, { name, color });
      this.isEdit = false;
      this.isGenCarsDisabled = false;
      this.emit("updateButtons");
    } else {
      await connector.createCar({ name, color });
    }
    this.getCars();
  };

  createCars = async () => {
    this.isEdit = false;
    this.isGenCarsDisabled = false;
    this.emit("updateButtons");
    for (let i = 0; i < 100; i += 1) {
      const color = `#${Math.floor(Math.random() * 0xffffff).toString(16)}`;
      const name = `${CARSNAME[Math.floor(Math.random() * CARSNAME.length)]} ${CARSMODEL[Math.floor(Math.random() * CARSMODEL.length)]}`;
      this.createCar(name, color);
    }
  };

  deleteCar = async (id: number) => {
    await connector.deleteCar(id);
    this.getCars();
  };

  setEditCar = (trac: TracType) => {
    if (this.editId === trac.id) {
      this.isEdit = !this.isEdit;
    } else {
      this.isEdit = true;
    }
    this.editId = trac.id;
    this.isGenCarsDisabled = true;
    this.nameCar = trac.name;
    this.colorCar = trac.color;
    this.emit("updateImput");
    this.emit("updateButtons");
  };

  nextPage = () => {
    if (this.currentPage < this.countPages) {
      this.currentPage += 1;
      this.getCars();
    }
  };

  prevPage = () => {
    if (this.currentPage > 1) {
      this.currentPage -= 1;
      this.getCars();
    }
  };
}
