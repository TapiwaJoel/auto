import {createFeatureSelector, createSelector} from '@ngrx/store';
import {DepartmentState, selectAll, selectTotal} from './departments.reducer';

export const selectDepartmentState = createFeatureSelector<DepartmentState>('departments');

export const selectDepartmentById = (departmentId: string) =>
  createSelector(selectDepartmentState, departmentState => departmentState.entities[departmentId]);
export const selectDepartmentLoading = createSelector(selectDepartmentState,
  (departmentState: DepartmentState) => departmentState.loading);
export const selectAllDepartments = createSelector(selectDepartmentState, selectAll);
export const selectAllTotalsDepartments = createSelector(selectDepartmentState, selectTotal);
