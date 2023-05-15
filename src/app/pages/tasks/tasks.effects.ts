import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, tap} from 'rxjs/operators';
import {ServiceResponse, ServiceSearchResponse} from '../utils/service.response';
import * as TaskActions from './tasks.actions';
import {Task} from './tasks.entity';
import {TaskService} from './tasks.service';
import {of} from 'rxjs';

@Injectable()
export class TaskEffects {
  task: Partial<Task>;

  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.loadTaskRequest),
      mergeMap(() => this.taskService.get()
        .pipe(
          map((response: ServiceSearchResponse<Partial<Task>[]>) =>
            TaskActions.loadTasks({tasks: response.data})),
          catchError(() => {
            return of(TaskActions.taskError());
          }),
        )),
    ));

  createTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.createTaskRequest),
      mergeMap((action) => this.taskService.post(action.task)
        .pipe(
          map((response: ServiceResponse<Partial<Task>>) =>
            TaskActions.loadCreatedTask({task: response.data})),
          catchError(() => {
            return of(TaskActions.taskError());
          }),
        )),
    ));

  editTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.editTaskRequest),
      mergeMap((action) => this.taskService.put(action.task)
        .pipe(
          map((response: ServiceResponse<Partial<Task>>) =>
            TaskActions.loadEditedTask({task: response.data})),
          tap((ev) => console.log('TEST', ev)),
        )),
    ));

  constructor(private actions$: Actions,
              private taskService: TaskService) {
  }
}

