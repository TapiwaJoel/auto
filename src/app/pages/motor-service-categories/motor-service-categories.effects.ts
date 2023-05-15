import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, tap} from 'rxjs/operators';
import {ServiceResponse, ServiceSearchResponse} from '../utils/service.response';
import * as MotorServiceCategoryActions from './motor-service-categories.actions';
import {MotorServiceCategory} from './motor-service-categories.entity';
import {MotorServiceCategoriesService} from './motor-service-categories.service';
import {of} from 'rxjs';

@Injectable()
export class MotorServiceCategoryEffects {
  motorServiceCategory: Partial<MotorServiceCategory>;

  loadMotorServiceCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MotorServiceCategoryActions.loadMotorServiceCategoryRequest),
      mergeMap(() => this.motorServiceCategoryService.get()
        .pipe(
          map((response: ServiceSearchResponse<Partial<MotorServiceCategory>[]>) =>
            MotorServiceCategoryActions.loadMotorServiceCategories({motorServiceCategories: response.data})),
          catchError(() => {
            return of(MotorServiceCategoryActions.motorServiceCategoryError());
          }),
        )),
    ));

  createMotorServiceCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MotorServiceCategoryActions.createServiceCategoryRequest),
      mergeMap((action) => this.motorServiceCategoryService.post(action.motorServiceCategory)
        .pipe(
          map((response: ServiceResponse<Partial<MotorServiceCategory>>) =>
            MotorServiceCategoryActions.loadCreatedMotorServiceCategory({motorServiceCategory: response.data})),
          catchError(() => {
            return of(MotorServiceCategoryActions.motorServiceCategoryError());
          }),
        )),
    ));

  editMotorServiceCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MotorServiceCategoryActions.editRequest),
      mergeMap((action) => this.motorServiceCategoryService.put(action.motorServiceCategory)
        .pipe(
          map((response: ServiceResponse<Partial<MotorServiceCategory>>) =>
            MotorServiceCategoryActions.loadEditedMotorServiceCategory({motorServiceCategory: response.data})),
          tap((ev) => console.log('TEST', ev)),
        )),
    ));

  constructor(private actions$: Actions,
              private motorServiceCategoryService: MotorServiceCategoriesService) {
  }
}

