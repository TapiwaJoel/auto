import {Component, OnInit} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {NbDialogService} from '@nebular/theme';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../app-store/app-state';
import {loadBookingRequest} from '../bookings.actions';
import {selectAllBookings} from '../bookings.selectors';
import {loadDepartmentRequest} from '../../departments/departments.actions';
import {BookingDetailsComponent} from '../booking-details/booking-details.component';
import {MotorServiceCategory} from '../../motor-service-categories/motor-service-categories.entity';
import jwt_decode from 'jwt-decode';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.scss'],
})
export class BookingListComponent implements OnInit {
  source: LocalDataSource = new LocalDataSource();
  role = '';
  departmentId = '';
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

  constructor(private dialogService: NbDialogService, private router: Router, private store: Store<AppState>) {
  }

  ngOnInit(): void {

    this.authValidation();
    this.store.dispatch(loadBookingRequest());
    this.store.dispatch(loadDepartmentRequest());

    this.store.pipe(select(selectAllBookings))
      .subscribe({
        next: (data) => {
          data = data.map(x => {
            return {
              id: x.id,
              registrationNumber: x.vehicle.registrationNumber,
              bookingStatus: x.bookingStatus,
              motorServiceCategories: x.motorServiceCategories.map((category: Partial<MotorServiceCategory>) => category.name).join(', '),
              motorServiceCategoryIds: x.motorServiceCategories.map((category: Partial<MotorServiceCategory>) => category.id).join(', '),
              additionalInformation: x.additionalInformation,
              recordStatus: x.recordStatus,
              dateCreated: x.dateCreated, ...x,
            };
          });

          if (this.role === 'ROLE_ADMIN') {
            this.source.load(data);
          } else {
            const departmentBookings = data.filter(booking => booking.vehicle?.departmentId === this.departmentId);
            this.source.load(departmentBookings);
          }
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

  authValidation() {
    const auth = localStorage.getItem('auth');
    if (!auth) {
      this.router.navigate(['/']);
      return;
    }

    const role: any = jwt_decode(JSON.parse(auth).data.accessToken);
    this.role = role.Roles;
    this.departmentId = role.DepartmentId;
  }
}
