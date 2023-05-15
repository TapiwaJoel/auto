import { createAction, props } from '@ngrx/store';
import {Vehicle} from './vehicles.entity';

export const vehicleError = createAction(
  '[Vehicle] Error',
);
export const loadVehicleRequest = createAction(
  '[Vehicle] Load Request',
);

export const createVehicleRequest = createAction(
  '[Vehicle] Create',
  props<{ vehicle: Partial<Vehicle> }>(),
);

export const editVehicleRequest = createAction(
  '[Vehicle] Edit',
  props<{ vehicle: Partial<Vehicle> }>(),
);

export const loadCreatedVehicle = createAction(
  '[Vehicle] Created',
  props<{ vehicle: Partial<Vehicle> }>(),
);

export const loadEditedVehicle = createAction(
  '[Vehicle] Edited',
  props<{ vehicle: Partial<Vehicle> }>(),
);

export const loadVehicles = createAction(
  '[Vehicle] Loaded',
  props<{ vehicles: Partial<Vehicle>[] }>(),
);
