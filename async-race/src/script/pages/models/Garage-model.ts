import Trac from "../../base/Trac";
import { CARSMODEL, CARSNAME, DEFAULTCAR, LIMITCAR } from "../../constants/constants";
import ICar from "../../infostructure/ICar";
import connector from "../../utils/Connector";
import Model from "./Model";
import TracModel from "../../base/Trac-model";

type TracModelType = InstanceType<typeof TracModel>;
type TracType = InstanceType<typeof Trac>;

export default class GarageModel extends Model {
  cars: ICar[];

  isEdit: boolean;

  editId: number;

  isGenCarsDisabled: boolean;

  isCreateCarDisabled: boolean;

  isResetDisabled: boolean;

  isStartDisabled: boolean;

  nameCar: string;

  colorCar: string;

  tracs: TracType[];

  constructor() {
    super();
    this.isEdit = false;
    this.editId = 0;
    this.tracs = [];
    this.nameCar = DEFAULTCAR.name;
    this.colorCar = DEFAULTCAR.color;
    this.limitCars = LIMITCAR.cars;
    this.isGenCarsDisabled = false;
    this.isCreateCarDisabled = false;
    this.isResetDisabled = true;
    this.isStartDisabled = false;
    this.getCars();
  }

  protected getCars = async () => {
    const { items, count } = await connector.getCars(this.currentPage, LIMITCAR.cars);
    this.cars = items;
    this.getTracs();
    this.updateItemsCars(Number(count));
    this.emit("updateCars");
  };

  private getTracs = () => {
    this.tracs = this.cars.map((car) => new Trac(car));
  };

  createCar = async (name: string, color: string) => {
    if (this.isEdit) {
      await connector.updateCar(this.editId, { name, color });
      this.isEdit = false;
      this.isGenCarsDisabled = false;
      this.emit("updateWinners");
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
      const color = `#${Math.floor(Math.random() * 0xffffff)
        .toString(16)
        .padStart(6, "0")}`;
      const name = `${CARSNAME[Math.floor(Math.random() * CARSNAME.length)]} ${CARSMODEL[Math.floor(Math.random() * CARSMODEL.length)]}`;
      this.createCar(name, color);
    }
  };

  deleteCar = async (id: number) => {
    await connector.deleteCar(id);
    this.getCars();
  };

  setEditCar = (trac: TracModelType) => {
    if (this.editId === trac.car.id) {
      this.isEdit = !this.isEdit;
    } else {
      this.isEdit = true;
    }
    this.editId = trac.car.id;
    this.isGenCarsDisabled = this.isEdit;
    this.nameCar = trac.car.name;
    this.colorCar = trac.car.color;
    this.emit("updateImput");
    this.emit("updateButtons");
  };

  startRace = () => {
    this.isCreateCarDisabled = true;
    this.isGenCarsDisabled = true;
    this.isResetDisabled = false;
    this.isStartDisabled = true;
    this.emit("updateButtons");
  };

  stopRace = () => {
    this.isCreateCarDisabled = false;
    this.isGenCarsDisabled = this.isEdit;
    this.isResetDisabled = true;
    this.isStartDisabled = false;
    this.emit("updateButtons");
  };
}
