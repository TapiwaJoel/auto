import { createAction, props } from '@ngrx/store';
import {Requisition} from './requisitions.entity';

export const requisitionError = createAction(
  '[Requisition] Error',
);

export const loadRequisitionRequest = createAction(
  '[Requisition] Load Request',
);

export const createRequest = createAction(
  '[Requisition] Create',
  props<{ requisition: Partial<Requisition> }>(),
);

export const editRequest = createAction(
  '[Requisition] Edit',
  props<{ requisition: Partial<Requisition> }>(),
);

export const loadCreatedRequisition = createAction(
  '[Requisition] Created',
  props<{ requisition: Partial<Requisition> }>(),
);

export const loadEditedRequisition = createAction(
  '[Requisition] Edited',
  props<{ requisition: Partial<Requisition> }>(),
);

export const loadRequisitions = createAction(
  '[Requisition] Loaded',
  props<{ requisitions: Partial<Requisition>[] }>(),
);
