import {HttpClient} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {Config, CONFIG_TOKEN} from '../utils/config';
import {Product} from './products.entity';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(@Inject(CONFIG_TOKEN) private config: Config,
              private http: HttpClient) {
  }

  get() {
    const pathUrl = '/products';
    return this.http.get(this.config.apiUrl + pathUrl);
  }

  post(product: Partial<Product>) {
    const pathUrl = '/products';
    return this.http.post(this.config.apiUrl + pathUrl, product);
  }

  put(product: Partial<Product>) {
    const pathUrl = '/products/';
    return this.http.put(this.config.apiUrl + pathUrl + product.id, product);
  }
}

