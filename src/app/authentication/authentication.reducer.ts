import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Authentication} from './authentication.entity';
import {AuthenticationActions, AuthenticationActionsTypes} from './authentication.actions';

export interface AuthenticationState extends EntityState<Partial<Authentication>> {
  error: any;
  success: boolean;
  loading: boolean;
  loaded: boolean;
}

export const adapter: EntityAdapter<Partial<Authentication>> = createEntityAdapter<Authentication>({
  selectId: (authentication: Authentication) => authentication._id,
});

export const initialAuthenticationState: AuthenticationState = adapter.getInitialState({
  error: undefined,
  success: false,
  loading: false,
  loaded: false,
});

export function authenticationReducer(state =
                                        initialAuthenticationState,
                                      action: AuthenticationActions): AuthenticationState {

  switch (action.type) {

    case AuthenticationActionsTypes.LogIn:
      return adapter.addOne(action.payload, {
        ...state,
        success: true,
        error: false,
        loading: false,
        loaded: true,
      });

    // case AuthenticationActionsTypes.LogInError:
    //   return adapter.addOne(action.payload, {
    //     ...state,
    //     success: false,
    //     error: action.payload.success,
    //     loading: false,
    //     loaded: true,
    //   });
    //
    // case AuthenticationActionsTypes.LogOutError:
    //   return adapter.addOne(action.payload, {
    //     ...state,
    //     success: false,
    //     error: action.payload.success,
    //     loading: false,
    //     loaded: true,
    //   });

    case AuthenticationActionsTypes.LogOut:
      return adapter.removeAll({
        ...state,
        success: true,
        error: undefined,
        loading: undefined,
        loaded: undefined,
      });

    case AuthenticationActionsTypes.StartLogIn:
      return {
        ...state,
        success: false,
        loading: true,
        loaded: false,
      };

    case AuthenticationActionsTypes.StopLogIn:
      return {
        ...state,
        loading: false,
        loaded: false,
      };

    default: {
      return state;
    }
  }
}
