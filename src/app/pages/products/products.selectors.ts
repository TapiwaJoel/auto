import {createFeatureSelector, createSelector} from '@ngrx/store';
import {ProductState, selectAll, selectTotal} from './products.reducer';

export const selectProductState = createFeatureSelector<ProductState>('products');

export const selectProductById = (productId: string) =>
  createSelector(selectProductState, productState => productState.entities[productId]);
export const selectProductLoading = createSelector(selectProductState,
  (productState: ProductState) => productState.loading);
export const selectAllProducts = createSelector(selectProductState, selectAll);
export const selectAllTotalsProducts = createSelector(selectProductState, selectTotal);
