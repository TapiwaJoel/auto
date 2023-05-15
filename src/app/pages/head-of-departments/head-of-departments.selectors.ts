import {createFeatureSelector, createSelector} from '@ngrx/store';
import {HeadOfDepartmentState, selectAll, selectTotal} from './head-of-departments.reducer';

export const selectHeadOfDepartmentState = createFeatureSelector<HeadOfDepartmentState>('head-of-departments');

export const selectHeadOfDepartmentById = (headOfDepartmentId: string) =>
  createSelector(selectHeadOfDepartmentState, headOfDepartmentState =>
    headOfDepartmentState.entities[headOfDepartmentId]);
export const selectHeadOfDepartmentLoading = createSelector(selectHeadOfDepartmentState,
  (headOfDepartmentState: HeadOfDepartmentState) => headOfDepartmentState.loading);
export const selectAllHeadOfDepartments = createSelector(selectHeadOfDepartmentState, selectAll);
export const selectAllTotalsHeadOfDepartments = createSelector(selectHeadOfDepartmentState, selectTotal);
