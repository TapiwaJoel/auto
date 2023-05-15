import {createFeatureSelector, createSelector} from '@ngrx/store';
import {BookingState, selectAll, selectTotal} from './bookings.reducer';

export const selectBookingState = createFeatureSelector<BookingState>('bookings');

export const selectBookingById = (bookingId: string) =>
  createSelector(selectBookingState, bookingState => bookingState.entities[bookingId]);
export const selectBookingLoading = createSelector(selectBookingState,
  (bookingState: BookingState) => bookingState.loading);
export const selectAllBookings = createSelector(selectBookingState, selectAll);
export const selectAllTotalsBookings = createSelector(selectBookingState, selectTotal);
