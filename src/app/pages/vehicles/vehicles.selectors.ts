import {createFeatureSelector, createSelector} from '@ngrx/store';
import {VehicleState, selectAll, selectTotal} from './vehicles.reducer';

export const selectVehicleState = createFeatureSelector<VehicleState>('vehicles');

export const selectVehicleById = (vehicleId: string) =>
  createSelector(selectVehicleState, vehicleState => vehicleState.entities[vehicleId]);
export const selectVehicleLoading = createSelector(selectVehicleState,
  (vehicleState: VehicleState) => vehicleState.loading);
export const selectAllVehicles = createSelector(selectVehicleState, selectAll);
export const selectAllTotalsVehicles = createSelector(selectVehicleState, selectTotal);
