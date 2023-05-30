import {Action} from '@ngrx/store';
import {Authentication} from './authentication.entity';
import {ServiceResponse} from '../pages/utils/service.response';
import {User} from '../pages/users/users.entity';


export enum AuthenticationActionsTypes {
  LogInRequest = '[Authentication] Log In Request',
  LogOutRequest = '[Authentication] Log Out Request',
  LogIn = '[Authentication] Log In',
  StartLogIn = '[Authentication] Start Log In',
  StopLogIn = '[Authentication] Stop Log In',
  LogOut = '[Authentication] Log Out',
  LogInError = '[Authentication] Log In Error',
  LogOutError = '[Authentication] Log In Error',
}

export class LogInRequest implements Action {
  readonly type = AuthenticationActionsTypes.LogInRequest;

  constructor(public payload: Partial<User>) {
  }
}

export class LogOutRequest implements Action {
  readonly type = AuthenticationActionsTypes.LogOutRequest;
}

export class StartLogIn implements Action {
  readonly type = AuthenticationActionsTypes.StartLogIn;
}

export class StopLogIn implements Action {
  readonly type = AuthenticationActionsTypes.StopLogIn;
}

export class LogIn implements Action {
  readonly type = AuthenticationActionsTypes.LogIn;

  constructor(public payload: Partial<Authentication>) {
  }
}

export class LogOut implements Action {
  readonly type = AuthenticationActionsTypes.LogOut;
}

export class LogInError implements Action {
  readonly type = AuthenticationActionsTypes.LogInError;

  constructor(public payload: Partial<Authentication>) {
  }
}

export class LogOutError implements Action {
  readonly type = AuthenticationActionsTypes.LogOutError;

  constructor(public payload: ServiceResponse<Partial<Authentication>>) {
  }
}

export type AuthenticationActions =
  LogInRequest
  | LogInError
  | StartLogIn
  | StopLogIn
  | LogOutError
  | LogOutRequest
  | LogOut
  | LogIn;
