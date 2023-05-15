import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {createReducer, on} from '@ngrx/store';
import * as RequisitionActions from './requisitions.actions';
import {Requisition} from './requisitions.entity';

export interface RequisitionState extends EntityState<Partial<Requisition>> {
  loading: boolean;
}

export const adapter: EntityAdapter<Partial<Requisition>> = createEntityAdapter<Requisition>({
  selectId: (requisition: Requisition) => requisition.id,
});

export const initialRequisitionState: RequisitionState = adapter.getInitialState({
  loading: false,
});

export const requisitionReducer = createReducer(
  initialRequisitionState,
  on(
    RequisitionActions.loadRequisitionRequest,
    RequisitionActions.createRequest, state => ({...state, loading: true})),
  on(
    RequisitionActions.requisitionError, state => ({...state, loading: false})),
  on(
    RequisitionActions.loadRequisitions,
    (state, action) => {
      return adapter.upsertMany(action.requisitions, {...state, loading: false});
    }),
  on(
    RequisitionActions.loadCreatedRequisition,
    RequisitionActions.loadEditedRequisition,
    (state, action) => {
      return adapter.upsertOne(action.requisition, {...state, loading: false});
    }),
);

export const {
  selectAll,
  selectTotal,
} = adapter.getSelectors();

