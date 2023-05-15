import { createAction, props } from '@ngrx/store';
import {Booking} from './bookings.entity';

export const bookingError = createAction(
  '[Booking] Error',
);
export const loadBookingRequest = createAction(
  '[Booking] Load Request',
);

export const createBookingRequest = createAction(
  '[Booking] Create',
  props<{ booking: Partial<Booking> }>(),
);

export const editBookingRequest = createAction(
  '[Booking] Edit',
  props<{ booking: Partial<Booking> }>(),
);

export const loadCreatedBooking = createAction(
  '[Booking] Created',
  props<{ booking: Partial<Booking> }>(),
);

export const loadEditedBooking = createAction(
  '[Booking] Edited',
  props<{ booking: Partial<Booking> }>(),
);

export const loadBookings = createAction(
  '[Booking] Loaded',
  props<{ bookings: Partial<Booking>[] }>(),
);
