import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {createReducer, on} from '@ngrx/store';
import * as DepartmentActions from './departments.actions';
import {Department} from './departments.entity';

export interface DepartmentState extends EntityState<Partial<Department>> {
  loading: boolean;
}

export const adapter: EntityAdapter<Partial<Department>> = createEntityAdapter<Department>({
  selectId: (department: Department) => department.id,
});

export const initialDepartmentState: DepartmentState = adapter.getInitialState({
  loading: false,
});

export const departmentReducer = createReducer(
  initialDepartmentState,
  on(
    DepartmentActions.loadDepartmentRequest,
    DepartmentActions.createRequest, state => ({...state, loading: true})),
  on(
    DepartmentActions.departmentError, state => ({...state, loading: false})),
  on(
    DepartmentActions.loadDepartments,
    (state, action) => {
      return adapter.upsertMany(action.departments, {...state, loading: false});
    }),
  on(
    DepartmentActions.loadCreatedDepartment,
    DepartmentActions.loadEditedDepartment,
    (state, action) => {
      return adapter.upsertOne(action.department, {...state, loading: false});
    }),
);

export const {
  selectAll,
  selectTotal,
} = adapter.getSelectors();

