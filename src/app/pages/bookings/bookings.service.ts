import {HttpClient} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {Config, CONFIG_TOKEN} from '../utils/config';
import {Booking} from './bookings.entity';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  constructor(@Inject(CONFIG_TOKEN) private config: Config,
              private http: HttpClient) {
  }

  get() {
    const pathUrl = '/bookings';
    return this.http.get(this.config.apiUrl + pathUrl);
  }

  post(booking: Partial<Booking>) {
    const pathUrl = '/bookings';
    return this.http.post(this.config.apiUrl + pathUrl, booking);
  }

  put(booking: Partial<Booking>) {
    console.log('here', booking);
    const pathUrl = '/bookings/';
    return this.http.put(this.config.apiUrl + pathUrl + booking.id, booking);
  }
}

