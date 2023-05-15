import {HttpClient} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {Config, CONFIG_TOKEN} from '../utils/config';
import {Department} from './departments.entity';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  constructor(@Inject(CONFIG_TOKEN) private config: Config,
              private http: HttpClient) {
  }

  get() {
    const pathUrl = '/departments';
    return this.http.get(this.config.apiUrl + pathUrl);
  }

  post(user: Partial<Department>) {
    const pathUrl = '/departments';
    return this.http.post(this.config.apiUrl + pathUrl, user);
  }

  put(user: Partial<Department>) {
    const pathUrl = '/departments/';
    return this.http.put(this.config.apiUrl + pathUrl + user.id, user);
  }
}

