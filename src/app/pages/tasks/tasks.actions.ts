import {createAction, props} from '@ngrx/store';
import {Task} from './tasks.entity';

export const taskError = createAction(
  '[Task] Error',
);
export const loadTaskRequest = createAction(
  '[Task] Load Request',
);

export const createTaskRequest = createAction(
  '[Task] Create',
  props<{ task: Partial<Task> }>(),
);

export const editTaskRequest = createAction(
  '[Task] Edit',
  props<{ task: Partial<Task> }>(),
);

export const loadCreatedTask = createAction(
  '[Task] Created',
  props<{ task: Partial<Task> }>(),
);

export const loadEditedTask = createAction(
  '[Task] Edited',
  props<{ task: Partial<Task> }>(),
);

export const loadTasks = createAction(
  '[Task] Loaded',
  props<{ tasks: Partial<Task>[] }>(),
);
