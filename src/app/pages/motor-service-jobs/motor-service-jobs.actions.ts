import { createAction, props } from '@ngrx/store';
import {MotorServiceJob} from './motor-service-jobs.entity';

export const motorServiceJobError = createAction(
  '[MotorServiceJob] Error',
);
export const loadMotorServiceJobRequest = createAction(
  '[MotorServiceJob] Load Request',
);

export const createMotorServiceJobRequest = createAction(
  '[MotorServiceJob] Create',
  props<{ motorServiceJob: Partial<MotorServiceJob> }>(),
);

export const editMotorServiceJobRequest = createAction(
  '[MotorServiceJob] Edit',
  props<{ motorServiceJob: Partial<MotorServiceJob> }>(),
);

export const loadCreatedMotorServiceJob = createAction(
  '[MotorServiceJob] Created',
  props<{ motorServiceJob: Partial<MotorServiceJob> }>(),
);

export const loadEditedMotorServiceJob = createAction(
  '[MotorServiceJob] Edited',
  props<{ motorServiceJob: Partial<MotorServiceJob> }>(),
);

export const loadMotorServiceJobs = createAction(
  '[MotorServiceJob] Loaded',
  props<{ motorServiceJobs: Partial<MotorServiceJob>[] }>(),
);
