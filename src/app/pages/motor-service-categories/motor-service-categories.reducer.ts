import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {createReducer, on} from '@ngrx/store';
import * as MotorServiceCategoryActions from './motor-service-categories.actions';
import {MotorServiceCategory} from './motor-service-categories.entity';

export interface MotorServiceCategoryState extends EntityState<Partial<MotorServiceCategory>> {
  loading: boolean;
}

export const adapter: EntityAdapter<Partial<MotorServiceCategory>> = createEntityAdapter<MotorServiceCategory>({
  selectId: (motorServiceCategory: MotorServiceCategory) => motorServiceCategory.id,
});

export const initialMotorServiceCategoryState: MotorServiceCategoryState = adapter.getInitialState({
  loading: false,
});

export const motorServiceCategoryReducer = createReducer(
  initialMotorServiceCategoryState,
  on(
    MotorServiceCategoryActions.loadMotorServiceCategoryRequest,
    MotorServiceCategoryActions.createServiceCategoryRequest, state => ({...state, loading: true})),
  on(
    MotorServiceCategoryActions.motorServiceCategoryError, state => ({...state, loading: false})),
  on(
    MotorServiceCategoryActions.loadMotorServiceCategories,
    (state, action) => {
      return adapter.upsertMany(action.motorServiceCategories, {...state, loading: false});
    }),
  on(
    MotorServiceCategoryActions.loadCreatedMotorServiceCategory,
    MotorServiceCategoryActions.loadEditedMotorServiceCategory,
    (state, action) => {
      return adapter.upsertOne(action.motorServiceCategory, {...state, loading: false});
    }),
);

export const {
  selectAll,
  selectTotal,
} = adapter.getSelectors();

