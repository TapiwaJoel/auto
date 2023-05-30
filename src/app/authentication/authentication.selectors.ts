import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AuthenticationState} from './authentication.reducer';

export const selectAuthenticationState = createFeatureSelector<AuthenticationState>('authentication');
export const selectAuthenticationError = createSelector(selectAuthenticationState, (authenticationState: AuthenticationState) => authenticationState.error);
export const selectAuthenticationToken = createSelector(selectAuthenticationState,
  (authenticationState: AuthenticationState) => authenticationState.entities[authenticationState.ids[0]].Token);
export const selectAuthenticationSuccess = createSelector(selectAuthenticationState, (authenticationState: AuthenticationState) => authenticationState.success);
export const selectAuthenticationLoading = createSelector(selectAuthenticationState, (authenticationState: AuthenticationState) => authenticationState.loading);
