import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {createReducer, on} from '@ngrx/store';
import * as MotorServiceJobActions from './motor-service-jobs.actions';
import {MotorServiceJob} from './motor-service-jobs.entity';

export interface MotorServiceJobState extends EntityState<Partial<MotorServiceJob>> {
  loading: boolean;
}

export const adapter: EntityAdapter<Partial<MotorServiceJob>> = createEntityAdapter<MotorServiceJob>({
  selectId: (motorServiceJob: MotorServiceJob) => motorServiceJob.id,
});

export const initialMotorServiceJobState: MotorServiceJobState = adapter.getInitialState({
  loading: false,
});

export const motorServiceJobsReducer = createReducer(
  initialMotorServiceJobState,
  on(
    MotorServiceJobActions.loadMotorServiceJobRequest,
    MotorServiceJobActions.createMotorServiceJobRequest, state => ({...state, loading: true})),
  on(
    MotorServiceJobActions.motorServiceJobError, state => ({...state, loading: false})),
  on(
    MotorServiceJobActions.loadMotorServiceJobs,
    (state, action) => {
      return adapter.upsertMany(action.motorServiceJobs, {...state, loading: false});
    }),
  on(
    MotorServiceJobActions.loadCreatedMotorServiceJob,
    MotorServiceJobActions.loadEditedMotorServiceJob,
    (state, action) => {
      return adapter.upsertOne(action.motorServiceJob, {...state, loading: false});
    }),
);

export const {
  selectAll,
  selectTotal,
} = adapter.getSelectors();

