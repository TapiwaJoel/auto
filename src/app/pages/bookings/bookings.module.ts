import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {BookingsRoutingModule} from './bookings-routing.module';
import {BookingListComponent} from './booking-list/booking-list.component';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {BookingEffects} from './bookings.effects';
import {bookingReducer} from './bookings.reducer';
import {BookingsComponent} from './bookings.component';
import {
  NbButtonModule,
  NbCardModule, NbCheckboxModule,
  NbListModule,
  NbRadioModule,
  NbSpinnerModule,
  NbToggleModule,
} from '@nebular/theme';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {DepartmentsModule} from '../departments/departments.module';
import {BookingDetailsComponent} from './booking-details/booking-details.component';
import {TasksModule} from '../tasks/tasks.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MotorServiceCategoriesModule} from '../motor-service-categories/motor-service-categories.module';

@NgModule({
  declarations: [
    BookingListComponent,
    BookingsComponent,
    BookingDetailsComponent,
  ],
  imports: [
    CommonModule,
    BookingsRoutingModule,
    DepartmentsModule,
    TasksModule,
    MotorServiceCategoriesModule,
    StoreModule.forFeature('bookings', bookingReducer),
    EffectsModule.forFeature([BookingEffects]),
    NbSpinnerModule,
    NbCardModule,
    Ng2SmartTableModule,
    NbButtonModule,
    NbToggleModule,
    FormsModule,
    NbRadioModule,
    NbListModule,
    NbCheckboxModule,
    ReactiveFormsModule,
  ],
})
export class BookingsModule {
}
