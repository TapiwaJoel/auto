import {createAction, props} from '@ngrx/store';
import {MotorServiceCategory} from './motor-service-categories.entity';

export const motorServiceCategoryError = createAction(
  '[MotorServiceCategory] Error',
);

export const loadMotorServiceCategoryRequest = createAction(
  '[MotorServiceCategory] Load Request',
);

export const createServiceCategoryRequest = createAction(
  '[MotorServiceCategory] Create',
  props<{ motorServiceCategory: Partial<MotorServiceCategory> }>(),
);

export const editRequest = createAction(
  '[MotorServiceCategory] Edit',
  props<{ motorServiceCategory: Partial<MotorServiceCategory> }>(),
);

export const loadCreatedMotorServiceCategory = createAction(
  '[MotorServiceCategory] Created',
  props<{ motorServiceCategory: Partial<MotorServiceCategory> }>(),
);

export const loadEditedMotorServiceCategory = createAction(
  '[MotorServiceCategory] Edited',
  props<{ motorServiceCategory: Partial<MotorServiceCategory> }>(),
);

export const loadMotorServiceCategories = createAction(
  '[MotorServiceCategory] Loaded',
  props<{ motorServiceCategories: Partial<MotorServiceCategory>[] }>(),
);
