import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, tap} from 'rxjs/operators';
import {ServiceResponse, ServiceSearchResponse} from '../utils/service.response';
import * as BookingActions from './bookings.actions';
import {Booking} from './bookings.entity';
import {BookingService} from './bookings.service';
import {of} from 'rxjs';

@Injectable()
export class BookingEffects {
  booking: Partial<Booking>;

  loadBookings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookingActions.loadBookingRequest),
      mergeMap(() => this.bookingService.get()
        .pipe(
          map((response: ServiceSearchResponse<Partial<Booking>[]>) =>
            BookingActions.loadBookings({bookings: response.data})),
          catchError(() => {
            return of(BookingActions.bookingError());
          }),
        )),
    ));

  createBookings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookingActions.createBookingRequest),
      mergeMap((action) => this.bookingService.post(action.booking)
        .pipe(
          map((response: ServiceResponse<Partial<Booking>>) =>
            BookingActions.loadCreatedBooking({booking: response.data})),
          catchError(() => {
            return of(BookingActions.bookingError());
          }),
        )),
    ));

  editBookings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookingActions.editBookingRequest),
      mergeMap((action) => this.bookingService.put(action.booking)
        .pipe(
          map((response: ServiceResponse<Partial<Booking>>) =>
            BookingActions.loadEditedBooking({booking: response.data})),
          tap((ev) => console.log('TEST', ev)),
        )),
    ));

  constructor(private actions$: Actions,
              private bookingService: BookingService) {
  }
}

