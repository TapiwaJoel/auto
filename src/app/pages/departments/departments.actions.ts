import { createAction, props } from '@ngrx/store';
import {Department} from './departments.entity';

export const departmentError = createAction(
  '[Department] Error',
);
export const loadDepartmentRequest = createAction(
  '[Department] Load Request',
);

export const createRequest = createAction(
  '[Department] Create',
  props<{ department: Partial<Department> }>(),
);

export const editRequest = createAction(
  '[Department] Edit',
  props<{ department: Partial<Department> }>(),
);

export const loadCreatedDepartment = createAction(
  '[Department] Created',
  props<{ department: Partial<Department> }>(),
);

export const loadEditedDepartment = createAction(
  '[Department] Edited',
  props<{ department: Partial<Department> }>(),
);

export const loadDepartments = createAction(
  '[Department] Loaded',
  props<{ departments: Partial<Department>[] }>(),
);
