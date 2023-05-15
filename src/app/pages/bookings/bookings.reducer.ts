import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {createReducer, on} from '@ngrx/store';
import * as BookingActions from './bookings.actions';
import {Booking} from './bookings.entity';

export interface BookingState extends EntityState<Partial<Booking>> {
  loading: boolean;
}

export const adapter: EntityAdapter<Partial<Booking>> = createEntityAdapter<Booking>({
  selectId: (booking: Booking) => booking.id,
});

export const initialBookingState: BookingState = adapter.getInitialState({
  loading: false,
});

export const bookingReducer = createReducer(
  initialBookingState,
  on(
    BookingActions.loadBookingRequest,
    BookingActions.createBookingRequest, state => ({...state, loading: true})),
  on(
    BookingActions.bookingError, state => ({...state, loading: false})),
  on(
    BookingActions.loadBookings,
    (state, action) => {
      return adapter.upsertMany(action.bookings, {...state, loading: false});
    }),
  on(
    BookingActions.loadCreatedBooking,
    BookingActions.loadEditedBooking,
    (state, action) => {
      return adapter.upsertOne(action.booking, {...state, loading: false});
    }),
);

export const {
  selectAll,
  selectTotal,
} = adapter.getSelectors();

