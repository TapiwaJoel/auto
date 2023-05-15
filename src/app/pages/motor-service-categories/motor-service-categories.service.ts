import {HttpClient} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {Config, CONFIG_TOKEN} from '../utils/config';
import {MotorServiceCategory} from './motor-service-categories.entity';

@Injectable({
  providedIn: 'root',
})
export class MotorServiceCategoriesService {
  constructor(@Inject(CONFIG_TOKEN) private config: Config,
              private http: HttpClient) {
  }

  get() {
    const pathUrl = '/motor-service-categories';
    return this.http.get(this.config.apiUrl + pathUrl);
  }

  post(motorServiceCategory: Partial<MotorServiceCategory>) {
    const pathUrl = '/motor-service-categories';
    return this.http.post(this.config.apiUrl + pathUrl, motorServiceCategory);
  }

  put(motorServiceCategory: Partial<MotorServiceCategory>) {
    const pathUrl = '/motor-service-categories';
    return this.http.put(this.config.apiUrl + pathUrl + motorServiceCategory.id, motorServiceCategory);
  }
}

