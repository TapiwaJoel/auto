import {HttpClient} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {Config, CONFIG_TOKEN} from '../utils/config';
import {Requisition} from './requisitions.entity';

@Injectable({
  providedIn: 'root',
})
export class RequisitionService {
  requisitions: Partial<Requisition>[] = [];

  constructor(@Inject(CONFIG_TOKEN) private config: Config,
              private http: HttpClient) {
  }

  get() {
    const pathUrl = '/requisition';
    return this.http.get(this.config.apiUrl + pathUrl);
  }

  post(user: Partial<Requisition>) {
    const pathUrl = '/requisition';
    return this.http.post(this.config.apiUrl + pathUrl, user);
  }

  put(user: Partial<Requisition>) {
    const pathUrl = '/requisition';
    return this.http.put(this.config.apiUrl + pathUrl + user.id, user);
  }
}

