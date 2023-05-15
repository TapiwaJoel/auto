import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, tap} from 'rxjs/operators';
import {ServiceResponse, ServiceSearchResponse} from '../utils/service.response';
import * as RequisitionActions from './requisitions.actions';
import { Requisition} from './requisitions.entity';
import {of} from 'rxjs';
import {RequisitionService} from './requisitions.service';

@Injectable()
export class RequisitionEffects {
  requisition: Partial<Requisition>;

  loadRequisitions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RequisitionActions.loadRequisitionRequest),
      mergeMap(() => this.requisitionService.get()
        .pipe(
          map((response: ServiceSearchResponse<Partial<Requisition>[]>) =>
            RequisitionActions.loadRequisitions({requisitions: response.data})),
          catchError(() => {
            return of(RequisitionActions.requisitionError());
          }),
        )),
    ));

  createRequisitions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RequisitionActions.createRequest),
      mergeMap((action) => this.requisitionService.post(action.requisition)
        .pipe(
          map((response: ServiceResponse<Partial<Requisition>>) =>
            RequisitionActions.loadCreatedRequisition({requisition: response.data})),
          catchError(() => {
            return of(RequisitionActions.requisitionError());
          }),
        )),
    ));

  editRequisitions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RequisitionActions.editRequest),
      mergeMap((action) => this.requisitionService.put(action.requisition)
        .pipe(
          map((response: ServiceResponse<Partial<Requisition>>) =>
            RequisitionActions.loadEditedRequisition({requisition: response.data})),
          tap((ev) => console.log('TEST', ev)),
        )),
    ));

  constructor(private actions$: Actions,
              private requisitionService: RequisitionService) {
  }
}

