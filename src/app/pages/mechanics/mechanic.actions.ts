import { createAction, props } from '@ngrx/store';
import {Mechanic} from './mechanic.entity';

export const mechanicError = createAction(
  '[Mechanic] Error',
);
export const loadMechanicRequest = createAction(
  '[Mechanic] Load Request',
);

export const createMechanicRequest = createAction(
  '[Mechanic] Create',
  props<{ mechanic: Partial<Mechanic> }>(),
);

export const editMechanicRequest = createAction(
  '[Mechanic] Edit',
  props<{ mechanic: Partial<Mechanic> }>(),
);

export const loadCreatedMechanic = createAction(
  '[Mechanic] Created',
  props<{ mechanic: Partial<Mechanic> }>(),
);

export const loadEditedMechanic = createAction(
  '[Mechanic] Edited',
  props<{ mechanic: Partial<Mechanic> }>(),
);

export const loadMechanics = createAction(
  '[Mechanic] Loaded',
  props<{ mechanics: Partial<Mechanic>[] }>(),
);
