import { createAction, props } from '@ngrx/store';
import {HeadOfDepartment} from './head-of-departments.entity';

export const headOfDepartmentError = createAction(
  '[HeadOfDepartment] Error',
);
export const loadHeadOfDepartmentRequest = createAction(
  '[HeadOfDepartment] Load Request',
);

export const createHeadOfDepartmentRequest = createAction(
  '[HeadOfDepartment] Create',
  props<{ headOfDepartment: Partial<HeadOfDepartment> }>(),
);

export const editHeadOfDepartmentRequest = createAction(
  '[HeadOfDepartment] Edit',
  props<{ headOfDepartment: Partial<HeadOfDepartment> }>(),
);

export const loadCreatedHeadOfDepartment = createAction(
  '[HeadOfDepartment] Created',
  props<{ headOfDepartment: Partial<HeadOfDepartment> }>(),
);

export const loadEditedHeadOfDepartment = createAction(
  '[HeadOfDepartment] Edited',
  props<{ headOfDepartment: Partial<HeadOfDepartment> }>(),
);

export const loadHeadOfDepartments = createAction(
  '[HeadOfDepartment] Loaded',
  props<{ headOfDepartments: Partial<HeadOfDepartment>[] }>(),
);
