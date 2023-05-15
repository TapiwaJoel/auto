import {createFeatureSelector, createSelector} from '@ngrx/store';
import {RequisitionState, selectAll, selectTotal} from './requisitions.reducer';

export const selectRequisitionState =
  createFeatureSelector<RequisitionState>('requisitions');

export const selectRequisitionById = (requisitionId: string) =>
  createSelector(selectRequisitionState, requisitionState => requisitionState.entities[requisitionId]);
export const selectRequisitionLoading = createSelector(selectRequisitionState,
  (requisitionState: RequisitionState) => requisitionState.loading);
export const selectAllRequisitions = createSelector(selectRequisitionState, selectAll);
export const selectAllTotalsRequisitions = createSelector(selectRequisitionState, selectTotal);
