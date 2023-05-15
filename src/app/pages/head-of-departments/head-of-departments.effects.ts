import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, tap} from 'rxjs/operators';
import {ServiceResponse, ServiceSearchResponse} from '../utils/service.response';
import * as HeadOfDepartmentsActions from './head-of-departments.actions';
import {HeadOfDepartment} from './head-of-departments.entity';
import {HeadOfDepartmentService} from './head-of-departments.service';
import {of} from 'rxjs';
import {createHeadOfDepartmentRequest, editHeadOfDepartmentRequest} from './head-of-departments.actions';

@Injectable()
export class HeadOfDepartmentsEffects {
  headOfDepartments: Partial<HeadOfDepartment>;

  loadHeadOfDepartments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HeadOfDepartmentsActions.loadHeadOfDepartmentRequest),
      mergeMap(() => this.headOfDepartmentsService.get()
        .pipe(
          map((response: ServiceSearchResponse<Partial<HeadOfDepartment>[]>) =>
            HeadOfDepartmentsActions.loadHeadOfDepartments({headOfDepartments: response.data})),
          catchError(() => {
            return of(HeadOfDepartmentsActions.headOfDepartmentError());
          }),
        )),
    ));

  createHeadOfDepartments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HeadOfDepartmentsActions.createHeadOfDepartmentRequest),
      mergeMap((action) => this.headOfDepartmentsService.post(action.headOfDepartment)
        .pipe(
          map((response: ServiceResponse<Partial<HeadOfDepartment>>) =>
            HeadOfDepartmentsActions.loadCreatedHeadOfDepartment({headOfDepartment: response.data})),
          catchError(() => {
            return of(HeadOfDepartmentsActions.headOfDepartmentError());
          }),
        )),
    ));

  editHeadOfDepartments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HeadOfDepartmentsActions.editHeadOfDepartmentRequest),
      mergeMap((action) => this.headOfDepartmentsService.put(action.headOfDepartment)
        .pipe(
          map((response: ServiceResponse<Partial<HeadOfDepartment>>) =>
            HeadOfDepartmentsActions.loadEditedHeadOfDepartment({headOfDepartment: response.data})),
          tap((ev) => console.log('TEST', ev)),
        )),
    ));

  constructor(private actions$: Actions,
              private headOfDepartmentsService: HeadOfDepartmentService) {
  }
}

