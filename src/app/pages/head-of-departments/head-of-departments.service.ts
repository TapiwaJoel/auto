import {HttpClient} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {Config, CONFIG_TOKEN} from '../utils/config';
import {HeadOfDepartment} from './head-of-departments.entity';

@Injectable({
  providedIn: 'root',
})
export class HeadOfDepartmentService {
  constructor(@Inject(CONFIG_TOKEN) private config: Config,
              private http: HttpClient) {
  }

  get() {
    const pathUrl = '/head-of-departments';
    return this.http.get(this.config.apiUrl + pathUrl);
  }

  post(headOfDepartment: Partial<HeadOfDepartment>) {
    const pathUrl = '/head-of-departments';
    return this.http.post(this.config.apiUrl + pathUrl, headOfDepartment);
  }

  put(headOfDepartment: Partial<HeadOfDepartment>) {
    const pathUrl = '/head-of-departments/';
    return this.http.put(this.config.apiUrl + pathUrl + headOfDepartment.id, headOfDepartment);
  }
}

