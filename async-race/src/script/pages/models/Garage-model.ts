import Trac from "../../base/Trac";
import { CARSMODEL, CARSNAME, DEFAULTCAR, LIMITCAR } from "../../constants/constants";
import ICar from "../../infostructure/ICar";
import connector from "../../utils/Connector";
import Model from './Model';

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

  constructor() {
    super();
    this.isEdit = false;
    this.editId = 0;
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
    this.updateItemsCars(Number(count));
    this.emit("updateCars");
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
      const color = `#${Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0')}`;
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
}
