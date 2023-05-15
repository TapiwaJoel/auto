import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, tap} from 'rxjs/operators';
import {ServiceResponse, ServiceSearchResponse} from '../utils/service.response';
import * as DepartmentActions from './departments.actions';
import {Department} from './departments.entity';
import {DepartmentService} from './departments.service';
import {of} from 'rxjs';

@Injectable()
export class DepartmentEffects {
  department: Partial<Department>;

  loadDepartments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DepartmentActions.loadDepartmentRequest),
      mergeMap(() => this.departmentService.get()
        .pipe(
          map((response: ServiceSearchResponse<Partial<Department>[]>) =>
            DepartmentActions.loadDepartments({departments: response.data})),
          catchError(() => {
            return of(DepartmentActions.departmentError());
          }),
        )),
    ));

  createDepartments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DepartmentActions.createRequest),
      mergeMap((action) => this.departmentService.post(action.department)
        .pipe(
          map((response: ServiceResponse<Partial<Department>>) =>
            DepartmentActions.loadCreatedDepartment({department: response.data})),
          catchError(() => {
            return of(DepartmentActions.departmentError());
          }),
        )),
    ));

  editDepartments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DepartmentActions.editRequest),
      mergeMap((action) => this.departmentService.put(action.department)
        .pipe(
          map((response: ServiceResponse<Partial<Department>>) =>
            DepartmentActions.loadEditedDepartment({department: response.data})),
          tap((ev) => console.log('TEST', ev)),
        )),
    ));

  constructor(private actions$: Actions,
              private departmentService: DepartmentService) {
  }
}

