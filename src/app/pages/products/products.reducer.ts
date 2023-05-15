import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {createReducer, on} from '@ngrx/store';
import * as ProductActions from './products.actions';
import {Product} from './products.entity';

export interface ProductState extends EntityState<Partial<Product>> {
  loading: boolean;
}

export const adapter: EntityAdapter<Partial<Product>> = createEntityAdapter<Product>({
  selectId: (product: Product) => product.id,
});

export const initialProductState: ProductState = adapter.getInitialState({
  loading: false,
});

export const productReducer = createReducer(
  initialProductState,
  on(
    ProductActions.loadProductRequest,
    ProductActions.createProductRequest, state => ({...state, loading: true})),
  on(
    ProductActions.productError, state => ({...state, loading: false})),
  on(
    ProductActions.loadProducts,
    (state, action) => {
      return adapter.upsertMany(action.products, {...state, loading: false});
    }),
  on(
    ProductActions.loadCreatedProduct,
    ProductActions.loadEditedProduct,
    (state, action) => {
      return adapter.upsertOne(action.product, {...state, loading: false});
    }),
);

export const {
  selectAll,
  selectTotal,
} = adapter.getSelectors();

