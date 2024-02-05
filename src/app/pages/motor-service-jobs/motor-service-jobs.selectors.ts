import {createFeatureSelector, createSelector} from '@ngrx/store';
import {MotorServiceJobState, selectAll, selectTotal} from './motor-service-jobs.reducer';

export const selectMotorServiceJobState = createFeatureSelector<MotorServiceJobState>('motorServiceJobs');

export const selectMotorServiceJobById = (motorServiceJobId: string) =>
  createSelector(selectMotorServiceJobState, motorServiceJobState =>
    motorServiceJobState.entities[motorServiceJobId]);
export const selectMotorServiceJobLoading = createSelector(selectMotorServiceJobState,
  (motorServiceJobState: MotorServiceJobState) => motorServiceJobState.loading);
export const selectAllMotorServiceJobs = createSelector(selectMotorServiceJobState, selectAll);
export const selectAllTotalsMotorServiceJobs = createSelector(selectMotorServiceJobState, selectTotal);
