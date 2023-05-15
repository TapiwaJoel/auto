import {createFeatureSelector, createSelector} from '@ngrx/store';
import {MotorServiceCategoryState, selectAll, selectTotal} from './motor-service-categories.reducer';

export const selectMotorServiceCategoryState = createFeatureSelector<MotorServiceCategoryState>('motor-service-categories');

export const selectMotorServiceCategoryById = (userId: string) =>
  createSelector(selectMotorServiceCategoryState, userState => userState.entities[userId]);
export const selectMotorServiceCategoryLoading = createSelector(selectMotorServiceCategoryState,
  (userState: MotorServiceCategoryState) => userState.loading);
export const selectAllMotorServiceCategories = createSelector(selectMotorServiceCategoryState, selectAll);
export const selectAllTotalsMotorServiceCategories = createSelector(selectMotorServiceCategoryState, selectTotal);
