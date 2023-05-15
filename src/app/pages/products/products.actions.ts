import { createAction, props } from '@ngrx/store';
import {Product} from './products.entity';

export const productError = createAction(
  '[Product] Error',
);
export const loadProductRequest = createAction(
  '[Product] Load Request',
);

export const createProductRequest = createAction(
  '[Product] Create',
  props<{ product: Partial<Product> }>(),
);

export const editProductRequest = createAction(
  '[Product] Edit',
  props<{ product: Partial<Product> }>(),
);

export const loadCreatedProduct = createAction(
  '[Product] Created',
  props<{ product: Partial<Product> }>(),
);

export const loadEditedProduct = createAction(
  '[Product] Edited',
  props<{ product: Partial<Product> }>(),
);

export const loadProducts = createAction(
  '[Product] Loaded',
  props<{ products: Partial<Product>[] }>(),
);
