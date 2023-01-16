import EventEmitter from "events";
import { LIMITCAR } from '../../constants/constants';
import ICar from '../../infostructure/ICar';
import IWinnerRequest from '../../infostructure/IWinnerRequest';

type EmitsName = "updateCars" | "updateButtons" | "updateImput";

export default abstract class Model extends EventEmitter {
  cars: ICar[] | IWinnerRequest[];

  countCars: number;

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
    this.currentPage = 1;
    this.countPages = 1;
    this.isPrevDisabled = true;
    this.isNextDisabled = true;
  }

  protected getCars = async () => {
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