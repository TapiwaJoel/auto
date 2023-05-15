import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, tap} from 'rxjs/operators';
import {ServiceResponse, ServiceSearchResponse} from '../utils/service.response';
import * as MechanicsActions from './mechanic.actions';
import {Mechanic} from './mechanic.entity';
import {MechanicService} from './mechanic.service';
import {of} from 'rxjs';

@Injectable()
export class MechanicEffects {
  mechanic: Partial<Mechanic>;

  loadMechanics$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MechanicsActions.loadMechanicRequest),
      mergeMap(() => this.mechanicService.get()
        .pipe(
          map((response: ServiceSearchResponse<Partial<Mechanic>[]>) =>
            MechanicsActions.loadMechanics({mechanics: response.data})),
          catchError(() => {
            return of(MechanicsActions.mechanicError());
          }),
        )),
    ));

  createMechanics$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MechanicsActions.createMechanicRequest),
      mergeMap((action) => this.mechanicService.post(action.mechanic)
        .pipe(
          map((response: ServiceResponse<Partial<Mechanic>>) =>
            MechanicsActions.loadCreatedMechanic({mechanic: response.data})),
          catchError(() => {
            return of(MechanicsActions.mechanicError());
          }),
        )),
    ));

  editMechanics$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MechanicsActions.editMechanicRequest),
      mergeMap((action) => this.mechanicService.put(action.mechanic)
        .pipe(
          map((response: ServiceResponse<Partial<Mechanic>>) =>
            MechanicsActions.loadEditedMechanic({mechanic: response.data})),
          tap((ev) => console.log('TEST', ev)),
        )),
    ));

  constructor(private actions$: Actions,
              private mechanicService: MechanicService) {
  }
}

