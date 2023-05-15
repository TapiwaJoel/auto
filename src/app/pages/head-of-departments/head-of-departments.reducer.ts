import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {createReducer, on} from '@ngrx/store';
import * as HeadOfDepartmentActions from './head-of-departments.actions';
import {HeadOfDepartment} from './head-of-departments.entity';

export interface HeadOfDepartmentState extends EntityState<Partial<HeadOfDepartment>> {
  loading: boolean;
}

export const adapter: EntityAdapter<Partial<HeadOfDepartment>> = createEntityAdapter<HeadOfDepartment>({
  selectId: (headOfDepartment: HeadOfDepartment) => headOfDepartment.id,
});

export const initialHeadOfDepartmentState: HeadOfDepartmentState = adapter.getInitialState({
  loading: false,
});

export const headOfDepartmentReducer = createReducer(
  initialHeadOfDepartmentState,
  on(
    HeadOfDepartmentActions.loadHeadOfDepartmentRequest,
    HeadOfDepartmentActions.createHeadOfDepartmentRequest, state => ({...state, loading: true})),
  on(
    HeadOfDepartmentActions.headOfDepartmentError, state => ({...state, loading: false})),
  on(
    HeadOfDepartmentActions.loadHeadOfDepartments,
    (state, action) => {
      return adapter.upsertMany(action.headOfDepartments, {...state, loading: false});
    }),
  on(
    HeadOfDepartmentActions.loadCreatedHeadOfDepartment,
    HeadOfDepartmentActions.loadEditedHeadOfDepartment,
    (state, action) => {
      return adapter.upsertOne(action.headOfDepartment, {...state, loading: false});
    }),
);

export const {
  selectAll,
  selectTotal,
} = adapter.getSelectors();

