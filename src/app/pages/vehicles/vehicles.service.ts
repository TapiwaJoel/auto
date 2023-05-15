import {HttpClient} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {Config, CONFIG_TOKEN} from '../utils/config';
import {Vehicle} from './vehicles.entity';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  constructor(@Inject(CONFIG_TOKEN) private config: Config,
              private http: HttpClient) {
  }

  get() {
    const pathUrl = '/vehicles';
    return this.http.get(this.config.apiUrl + pathUrl);
  }

  post(vehicle: Partial<Vehicle>) {
    const pathUrl = '/vehicles';
    return this.http.post(this.config.apiUrl + pathUrl, vehicle);
  }

  put(vehicle: Partial<Vehicle>) {
    const pathUrl = '/vehicles/';
    return this.http.put(this.config.apiUrl + pathUrl + vehicle.id, vehicle);
  }
}

