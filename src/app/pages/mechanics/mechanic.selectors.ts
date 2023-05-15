import {createFeatureSelector, createSelector} from '@ngrx/store';
import {MechanicState, selectAll, selectTotal} from './mechanic.reducer';

export const selectMechanicState = createFeatureSelector<MechanicState>('mechanics');

export const selectMechanicById = (mechanicId: string) =>
  createSelector(selectMechanicState, mechanicState =>
    mechanicState.entities[mechanicId]);
export const selectMechanicLoading = createSelector(selectMechanicState,
  (mechanicState: MechanicState) => mechanicState.loading);
export const selectAllMechanics = createSelector(selectMechanicState, selectAll);
export const selectAllTotalsMechanics = createSelector(selectMechanicState, selectTotal);
