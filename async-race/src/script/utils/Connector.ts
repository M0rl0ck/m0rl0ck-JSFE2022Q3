import ICar from '../infostructure/ICar';
import ICreateCarRequest from '../infostructure/ICreateCarRequest';
import IGetCars from '../infostructure/IGetCars';
import IUpdateWinnerCarRequest from '../infostructure/IUpdateWinnerCarRequest';
import { Sort, Order, StartEngine } from '../infostructure/types';
import IWinnerRequest from '../infostructure/IWinnerRequest';
import IGetWinners from '../infostructure/IGetWinners';
import IGetWinner from '../infostructure/IGetWinner';
import IGetSpeedCar from '../infostructure/IGetSpeedCar';
import IStatusDrive from '../infostructure/IStatusDrive';

class Connector {
  url: string;

  constructor(url: string) {
    this.url = url;
  }

  async request<RES, T>(
    endurl: string,
    method: string,
    body: T | undefined = undefined,
  ) {
    const requestInit = {
      method: method || undefined,
      headers: {
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : undefined,
    };

    try {
    const responce = await fetch(`${this.url}${endurl}`, requestInit);
    const { status } = responce;
    const total = responce.headers.get('X-Total-Count') || '0';
    const result: RES = responce.status === 200 ? await responce.json() : {success: false};
     
    return { result, total, status };
    } catch (e) {
      if ( e instanceof Error) {
        console.log(e.message);
        
      }
      return undefined;
    }
    

  }

  async getCars(page: number, limit: number): Promise<IGetCars> {
    const { result, total } = await this.request<ICar[], undefined>(
      `garage?_page=${page}&_limit=${limit}`,
      'GET',
    );

    return {
      items: result,
      count: total,
    };
  }

  async getCar(id: number): Promise<ICar[]> {
    const { result } = await this.request<ICar[], undefined>(`garage?id=${id}`, 'GET'); // http://127.0.0.1:3000/garage?id=2
    return result;
  }

  async createCar(body: ICreateCarRequest): Promise<ICar> {
    const { result } = await this.request<ICar, ICreateCarRequest>('garage', 'POST', body);
    return result;
  }

  async deleteCar(id: number): Promise<Record<string, never>> {
    const { result } = await this.request<Record<string, never>, undefined>(`garage/${id}`, 'DELETE');
    return result;
  }

  async updateCar(id: number, body: ICreateCarRequest): Promise<ICreateCarRequest> {
    const { result } = await this.request<ICreateCarRequest, ICreateCarRequest>(`garage/${id}`, 'PUT', body);
    return result;
  }

  async startStopEngineCar(id: number, status: StartEngine): Promise<IGetSpeedCar> {
    const { result } = await this.request<IGetSpeedCar, undefined>(`engine?id=${id}&status=${status}`, 'PATCH');
    return result;
  }

  async driveCar(id: number) {
    const { result, status } = await this.request<IStatusDrive, undefined>(`engine?id=${id}&status=drive`, 'PATCH');
    return { result, status };
  }

  async getWinnersCar(
    page: number,
    limit: number,
    sort: Sort = 'id',
    order: Order = 'ASC',
  ): Promise<IGetWinners> {
    const { result, total } = await this.request<IWinnerRequest[], undefined>(
      `winners?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`,
      'GET',
    );

    return {
      items: result,
      count: total,
    };
  }

  async getWinnerCar(id: number): Promise<IGetWinner> {
    const { result, status } = await this.request<IWinnerRequest[], undefined>(`winners?id=${id}`, 'GET');
    return {
      items: result,
      status,
    };
  }

  async createWinnerCar(body: IWinnerRequest): Promise<IWinnerRequest[]> {
    const { result } = await this.request<IWinnerRequest[], IWinnerRequest>('winners', 'POST', body);
    return result;
  }

  async deleteWinnerCar(id: number): Promise<Record<string, never>>  {
    const { result } = await this.request<Record<string, never>, undefined>(`winners/${id}`, 'DELETE');
    return result;
  }

  async updateWinnerCar(id: number, body: IUpdateWinnerCarRequest): Promise<IWinnerRequest> {
    const { result } = await this.request<IWinnerRequest, IUpdateWinnerCarRequest>(`winners/${id}`, 'PUT', body);
    return result;
  }
}

const url = 'http://127.0.0.1:3000/';
const connector = new Connector(url);
export default connector;
