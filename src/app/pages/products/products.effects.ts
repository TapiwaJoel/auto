import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, tap} from 'rxjs/operators';
import {ServiceResponse, ServiceSearchResponse} from '../utils/service.response';
import * as ProductActions from './products.actions';
import {Product} from './products.entity';
import {ProductService} from './products.service';
import {of} from 'rxjs';

@Injectable()
export class ProductEffects {
  product: Partial<Product>;

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProductRequest),
      mergeMap(() => this.productService.get()
        .pipe(
          map((response: ServiceSearchResponse<Partial<Product>[]>) =>
            ProductActions.loadProducts({products: response.data})),
          catchError(() => {
            return of(ProductActions.productError());
          }),
        )),
    ));

  createProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.createProductRequest),
      mergeMap((action) => this.productService.post(action.product)
        .pipe(
          map((response: ServiceResponse<Partial<Product>>) =>
            ProductActions.loadCreatedProduct({product: response.data})),
          catchError(() => {
            return of(ProductActions.productError());
          }),
        )),
    ));

  editProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.editProductRequest),
      mergeMap((action) => this.productService.put(action.product)
        .pipe(
          map((response: ServiceResponse<Partial<Product>>) =>
            ProductActions.loadEditedProduct({product: response.data})),
          tap((ev) => console.log('TEST', ev)),
        )),
    ));

  constructor(private actions$: Actions,
              private productService: ProductService) {
  }
}

