import {HttpClient} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {Config, CONFIG_TOKEN} from '../utils/config';
import {MotorServiceJob} from './motor-service-jobs.entity';
import {Product} from '../products/products.entity';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MotorServiceJobsService {

  products: Partial<Product>[] = [];

  productBehavioral = new BehaviorSubject(this.products);

  constructor(@Inject(CONFIG_TOKEN) private config: Config, private http: HttpClient) {
  }

  get() {
    const pathUrl = '/tasks';
    return this.http.get(this.config.apiUrl + pathUrl);
  }

  getMaterials(criteria: string) {
    const pathUrl = '/materials/task/' + criteria;
    return this.http.get(this.config.apiUrl + pathUrl);
  }

  postMaterials(body: any) {
    const pathUrl = '/materials';
    return this.http.post(this.config.apiUrl + pathUrl, body);
  }

  post(motorServiceJob: Partial<MotorServiceJob>) {
    const pathUrl = '/tasks';
    return this.http.post(this.config.apiUrl + pathUrl, motorServiceJob);
  }

  put(motorServiceJob: Partial<MotorServiceJob>) {
    const pathUrl = '/tasks/';
    return this.http.put(this.config.apiUrl + pathUrl + motorServiceJob.id, motorServiceJob);
  }
}

