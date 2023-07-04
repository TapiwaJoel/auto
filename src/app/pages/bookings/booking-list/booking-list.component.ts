import {Component, OnInit} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {NbDialogService} from '@nebular/theme';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../app-store/app-state';
import {loadBookingRequest} from '../bookings.actions';
import {selectAllBookings} from '../bookings.selectors';
import {loadDepartmentRequest} from '../../departments/departments.actions';
import {BookingDetailsComponent} from '../booking-details/booking-details.component';

@Component({
  selector: 'ngx-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.scss'],
})
export class BookingListComponent implements OnInit {
  source: LocalDataSource = new LocalDataSource();
  settings = {
    actions: false,
    columns: {
      registrationNumber: {
        title: 'Reg. Number',
        type: 'string',
      },
      bookingStatus: {
        title: 'Booking Status',
        type: 'string',
      },
      motorServiceCategories: {
        title: 'Service Types',
        type: 'string',
      },
      additionalInformation: {
        title: 'Comment',
        type: 'string',
      },
      recordStatus: {
        title: 'Status',
        type: 'string',
        filter: {
          type: 'list',
          config: {
            selectText: 'Select...',
            list: [
              {value: 'ACTIVE', title: 'ACTIVE'},
              {value: 'DEACTIVATED', title: 'DEACTIVATED'},
            ],
          },
        },
      },
      dateCreated: {
        title: 'Date',
        type: 'date',
        filter: {
          type: 'datepicker',
          config: {
            datepicker: {
              selectMode: 'range',
              placeholder: 'Pick date...',
            },
          },
        },
        editor: {
          type: 'datepicker',
        },
      },
    },
  };


  constructor(private dialogService: NbDialogService, private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.store.dispatch(loadBookingRequest());
    this.store.dispatch(loadDepartmentRequest());

    this.store.pipe(select(selectAllBookings))
      .subscribe({
        next: (data) => {

          console.log('data', data);

          data = data.map(x => {
            return {
              id: x.id,
              registrationNumber: x.vehicle.registrationNumber,
              bookingStatus: x.bookingStatus,
              motorServiceCategories: x.motorServiceCategories.map(cat => cat.category).join(', '),
              additionalInformation: x.additionalInformation,
              recordStatus: x.recordStatus,
              dateCreated: x.dateCreated,
            };
          });
          this.source.load(data);
        },
      });
  }

  onRowSelect($event: any) {
    this.dialogService.open(BookingDetailsComponent, {
      context: {
        booking: $event.data,
      },
    });
  }
}
