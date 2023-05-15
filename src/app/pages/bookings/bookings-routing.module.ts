import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BookingsComponent} from './bookings.component';
import {BookingListComponent} from './booking-list/booking-list.component';

const routes: Routes = [{
  path: '',
  component: BookingsComponent,
  children: [
    {
      path: '',
      component: BookingListComponent,
    }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingsRoutingModule {
}
