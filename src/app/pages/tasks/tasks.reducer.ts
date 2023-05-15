import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {createReducer, on} from '@ngrx/store';
import * as TaskActions from './tasks.actions';
import {Task} from './tasks.entity';

export interface TaskState extends EntityState<Partial<Task>> {
  loading: boolean;
}

export const adapter: EntityAdapter<Partial<Task>> = createEntityAdapter<Task>({
  selectId: (task: Task) => task.id,
});

export const initialTaskState: TaskState = adapter.getInitialState({
  loading: false,
});

export const taskReducer = createReducer(
  initialTaskState,
  on(
    TaskActions.loadTaskRequest,
    TaskActions.createTaskRequest, state => ({...state, loading: true})),
  on(
    TaskActions.taskError, state => ({...state, loading: false})),
  on(
    TaskActions.loadTasks,
    (state, action) => {
      return adapter.upsertMany(action.tasks, {...state, loading: false});
    }),
  on(
    TaskActions.loadCreatedTask,
    TaskActions.loadEditedTask,
    (state, action) => {
      return adapter.upsertOne(action.task, {...state, loading: false});
    }),
);

export const {
  selectAll,
  selectTotal,
} = adapter.getSelectors();

