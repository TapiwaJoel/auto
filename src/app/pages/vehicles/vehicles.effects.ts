import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, tap} from 'rxjs/operators';
import {ServiceResponse, ServiceSearchResponse} from '../utils/service.response';
import * as VehicleActions from './vehicles.actions';
import {Vehicle} from './vehicles.entity';
import {VehicleService} from './vehicles.service';
import {of} from 'rxjs';

@Injectable()
export class VehicleEffects {
  vehicle: Partial<Vehicle>;

  loadVehicles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VehicleActions.loadVehicleRequest),
      mergeMap(() => this.vehicleService.get()
        .pipe(
          map((response: ServiceSearchResponse<Partial<Vehicle>[]>) =>
            VehicleActions.loadVehicles({vehicles: response.data})),
          catchError(() => {
            return of(VehicleActions.vehicleError());
          }),
        )),
    ));

  createVehicles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VehicleActions.createVehicleRequest),
      mergeMap((action) => this.vehicleService.post(action.vehicle)
        .pipe(
          map((response: ServiceResponse<Partial<Vehicle>>) =>
            VehicleActions.loadCreatedVehicle({vehicle: response.data})),
          catchError(() => {
            return of(VehicleActions.vehicleError());
          }),
        )),
    ));

  editVehicles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VehicleActions.editVehicleRequest),
      mergeMap((action) => this.vehicleService.put(action.vehicle)
        .pipe(
          map((response: ServiceResponse<Partial<Vehicle>>) =>
            VehicleActions.loadEditedVehicle({vehicle: response.data})),
          tap((ev) => console.log('TEST', ev)),
        )),
    ));

  constructor(private actions$: Actions,
              private vehicleService: VehicleService) {
  }
}

