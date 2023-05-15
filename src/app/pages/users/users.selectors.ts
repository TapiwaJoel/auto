import {createFeatureSelector, createSelector} from '@ngrx/store';
import {UserState, selectAll, selectTotal} from './users.reducer';

export const selectUserState = createFeatureSelector<UserState>('users');

export const selectUserById = (userId: string) =>
  createSelector(selectUserState, userState => userState.entities[userId]);
export const selectUserLoading = createSelector(selectUserState,
  (userState: UserState) => userState.loading);
export const selectAllUsers = createSelector(selectUserState, selectAll);
export const selectAllTotalsUsers = createSelector(selectUserState, selectTotal);
