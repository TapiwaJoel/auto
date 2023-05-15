import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, tap} from 'rxjs/operators';
import {ServiceResponse, ServiceSearchResponse} from '../utils/service.response';
import * as UserActions from './users.actions';
import {User} from './users.entity';
import {UserService} from './users.service';
import {of} from 'rxjs';

@Injectable()
export class UserEffects {
  user: Partial<User>;

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUserRequest),
      mergeMap(() => this.userService.get()
        .pipe(
          map((response: ServiceSearchResponse<Partial<User>[]>) =>
            UserActions.loadUsers({users: response.data})),
          catchError(() => {
            return of(UserActions.userError());
          }),
        )),
    ));

  createUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.createRequest),
      mergeMap((action) => this.userService.post(action.user)
        .pipe(
          map((response: ServiceResponse<Partial<User>>) =>
            UserActions.loadCreatedUser({user: response.data})),
          catchError(() => {
            return of(UserActions.userError());
          }),
        )),
    ));

  editUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.editRequest),
      mergeMap((action) => this.userService.put(action.user)
        .pipe(
          map((response: ServiceResponse<Partial<User>>) =>
            UserActions.loadEditedUser({user: response.data})),
          tap((ev) => console.log('TEST', ev)),
        )),
    ));

  constructor(private actions$: Actions,
              private userService: UserService) {
  }
}

