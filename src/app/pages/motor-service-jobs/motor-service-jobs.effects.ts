import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, tap} from 'rxjs/operators';
import {ServiceResponse, ServiceSearchResponse} from '../utils/service.response';
import * as MotorServiceJobsActions from './motor-service-jobs.actions';
import {MotorServiceJob} from './motor-service-jobs.entity';
import {MotorServiceJobsService} from './motor-service-jobs.service';
import {of} from 'rxjs';

@Injectable()
export class MotorServiceJobsEffects {
  motorServiceJob: Partial<MotorServiceJob>;

  loadMotorServiceJobs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MotorServiceJobsActions.loadMotorServiceJobRequest),
      mergeMap(() => this.motorServiceJobService.get()
        .pipe(
          map((response: ServiceSearchResponse<Partial<MotorServiceJob>[]>) =>
            MotorServiceJobsActions.loadMotorServiceJobs({motorServiceJobs: response.data})),
          catchError(() => {
            return of(MotorServiceJobsActions.motorServiceJobError());
          }),
        )),
    ));

  createMotorServiceJobs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MotorServiceJobsActions.createMotorServiceJobRequest),
      mergeMap((action) => this.motorServiceJobService.post(action.motorServiceJob)
        .pipe(
          map((response: ServiceResponse<Partial<MotorServiceJob>>) =>
            MotorServiceJobsActions.loadCreatedMotorServiceJob({motorServiceJob: response.data})),
          catchError(() => {
            return of(MotorServiceJobsActions.motorServiceJobError());
          }),
        )),
    ));

  editMotorServiceJobs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MotorServiceJobsActions.editMotorServiceJobRequest),
      mergeMap((action) => this.motorServiceJobService.put(action.motorServiceJob)
        .pipe(
          map((response: ServiceResponse<Partial<MotorServiceJob>>) =>
            MotorServiceJobsActions.loadEditedMotorServiceJob({motorServiceJob: response.data})),
          tap((ev) => console.log('TEST', ev)),
        )),
    ));

  constructor(private actions$: Actions,
              private motorServiceJobService: MotorServiceJobsService) {
  }
}

