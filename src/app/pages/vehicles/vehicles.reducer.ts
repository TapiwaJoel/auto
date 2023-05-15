import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {createReducer, on} from '@ngrx/store';
import * as VehicleActions from './vehicles.actions';
import {Vehicle} from './vehicles.entity';

export interface VehicleState extends EntityState<Partial<Vehicle>> {
  loading: boolean;
}

export const adapter: EntityAdapter<Partial<Vehicle>> = createEntityAdapter<Vehicle>({
  selectId: (vehicle: Vehicle) => vehicle.id,
});

export const initialVehicleState: VehicleState = adapter.getInitialState({
  loading: false,
});

export const vehicleReducer = createReducer(
  initialVehicleState,
  on(
    VehicleActions.loadVehicleRequest,
    VehicleActions.createVehicleRequest, state => ({...state, loading: true})),
  on(
    VehicleActions.vehicleError, state => ({...state, loading: false})),
  on(
    VehicleActions.loadVehicles,
    (state, action) => {
      return adapter.upsertMany(action.vehicles, {...state, loading: false});
    }),
  on(
    VehicleActions.loadCreatedVehicle,
    VehicleActions.loadEditedVehicle,
    (state, action) => {
      return adapter.upsertOne(action.vehicle, {...state, loading: false});
    }),
);

export const {
  selectAll,
  selectTotal,
} = adapter.getSelectors();

