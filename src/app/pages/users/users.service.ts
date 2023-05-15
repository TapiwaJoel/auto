import {HttpClient} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {Config, CONFIG_TOKEN} from '../utils/config';
import {User} from './users.entity';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(@Inject(CONFIG_TOKEN) private config: Config,
              private http: HttpClient) {
  }

  get() {
    const pathUrl = '/users';
    return this.http.get(this.config.apiUrl + pathUrl);
  }

  post(user: Partial<User>) {
    const pathUrl = '/users';
    return this.http.post(this.config.apiUrl + pathUrl, user);
  }

  put(user: Partial<User>) {
    const pathUrl = '/users/';
    return this.http.put(this.config.apiUrl + pathUrl + user.id, user);
  }
}

