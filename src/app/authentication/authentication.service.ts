import {HttpClient} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Config, CONFIG_TOKEN} from '../pages/utils/config';
import {ServiceResponse} from '../pages/utils/service.response';
import {Authentication} from './authentication.entity';

@Injectable({
  providedIn: 'root',
})

export class AuthenticationService {

  loggedInUser = new BehaviorSubject<any>(null);

  constructor(@Inject(CONFIG_TOKEN) private config: Config, private http: HttpClient) {
  }

  login(body: Partial<Authentication>) {
    return this.http.post<ServiceResponse<Authentication>>(this.config.apiUrl + '/auth/login', body);
  }

  logout() {
    return this.http.put<ServiceResponse<Authentication>>(this.config.apiUrl + '/administrators/authentication', null);
  }
}
