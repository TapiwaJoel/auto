import {HttpClient} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {Config, CONFIG_TOKEN} from '../utils/config';
import {Task} from './tasks.entity';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(@Inject(CONFIG_TOKEN) private config: Config,
              private http: HttpClient) {
  }

  get() {
    const pathUrl = '/tasks';
    return this.http.get(this.config.apiUrl + pathUrl);
  }

  post(task: Partial<Task>) {
    const pathUrl = '/tasks';
    return this.http.post(this.config.apiUrl + pathUrl, task);
  }

  put(task: Partial<Task>) {
    const pathUrl = '/tasks/';
    return this.http.put(this.config.apiUrl + pathUrl + task.id, task);
  }
}

