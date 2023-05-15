import {createFeatureSelector, createSelector} from '@ngrx/store';
import {TaskState, selectAll, selectTotal} from './tasks.reducer';

export const selectTaskState = createFeatureSelector<TaskState>('tasks');

export const selectTaskById = (taskId: string) =>
  createSelector(selectTaskState, taskState => taskState.entities[taskId]);
export const selectTaskLoading = createSelector(selectTaskState,
  (taskState: TaskState) => taskState.loading);
export const selectAllTasks = createSelector(selectTaskState, selectAll);
export const selectAllTotalsTasks = createSelector(selectTaskState, selectTotal);
