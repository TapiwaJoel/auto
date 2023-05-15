import {HttpClient} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {Config, CONFIG_TOKEN} from '../utils/config';
import {Mechanic} from './mechanic.entity';

@Injectable({
  providedIn: 'root',
})
export class MechanicService {
  constructor(@Inject(CONFIG_TOKEN) private config: Config,
              private http: HttpClient) {
  }

  get() {
    const pathUrl = '/mechanics';
    return this.http.get(this.config.apiUrl + pathUrl);
  }

  post(mechanic: Partial<Mechanic>) {
    const pathUrl = '/mechanics';
    return this.http.post(this.config.apiUrl + pathUrl, mechanic);
  }

  put(mechanic: Partial<Mechanic>) {
    const pathUrl = '/mechanics/';
    return this.http.put(this.config.apiUrl + pathUrl + mechanic.id, mechanic);
  }
}

