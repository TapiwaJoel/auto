import {Component, OnInit} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {loadBookingRequest} from '../../bookings/bookings.actions';
import {loadDepartmentRequest} from '../../departments/departments.actions';
import {select, Store} from '@ngrx/store';
import {selectAllBookings} from '../../bookings/bookings.selectors';
import {MotorServiceCategory} from '../../motor-service-categories/motor-service-categories.entity';
import {AppState} from '../../app-store/app-state';
import {NbDialogService} from '@nebular/theme';
import {MotorServiceJobsEditComponent} from '../motor-service-jobs-edit/motor-service-jobs-edit.component';
import {Booking} from '../../bookings/bookings.entity';
import {
  MotorServiceJobCategoryListComponent
} from '../motor-service-job-category-list/motor-service-job-category-list.component';

@Component({
  selector: 'ngx-motor-service-jobs-list',
  templateUrl: './motor-service-jobs-list.component.html',
  styleUrls: ['./motor-service-jobs-list.component.scss'],
})
export class MotorServiceJobsListComponent implements OnInit {

  bookings: Partial<Booking>[] = [];
  source: LocalDataSource = new LocalDataSource();
  settings = {
    actions: false, columns: {
      id: {
        title: 'Booking ID', type: 'string',
      }, registrationNumber: {
        title: 'Reg. Number', type: 'string',
      }, motorServiceCategories: {
        title: 'Services To Be Performed', type: 'string',
      }, bookingStatus: {
        title: 'Job Status', type: 'string', filter: {
          type: 'list', config: {
            selectText: 'Select...', list: [{value: 'WIP', title: 'WIP'}, {value: 'COMPLETED', title: 'COMPLETED'}, {
              value: 'CANCELLED', title: 'CANCELLED',
            }, {
              value: 'PENDING', title: 'PENDING',
            }],
          },
        },
      }, dateCreated: {
        title: 'Date', type: 'date', filter: {
          type: 'datepicker', config: {
            datepicker: {
              selectMode: 'range', placeholder: 'Pick date...',
            },
          },
        }, editor: {
          type: 'datepicker',
        },
      },
    },
  };

  constructor(private store: Store<AppState>, private dialogService: NbDialogService) {
  }

  ngOnInit(): void {

    this.store.dispatch(loadBookingRequest());
    this.store.dispatch(loadDepartmentRequest());

    this.store.pipe(select(selectAllBookings))
      .subscribe({
        next: (data) => {
          this.bookings = data;
          data = data.filter(dar => dar.bookingStatus === 'DEPARTMENT_APPROVED');
          data = data.map(x => {
            return {
              id: x.id,
              registrationNumber: x.vehicle.registrationNumber,
              services: x.motorServiceCategories,
              bookingStatus: x.bookingStatus,
              motorServiceCategories: x.motorServiceCategories.map((category: Partial<MotorServiceCategory>) => category.name).join(', '),
              motorServiceCategoryIds: x.motorServiceCategories.map((category: Partial<MotorServiceCategory>) => category.id).join(', '),
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
    this.dialogService.open(MotorServiceJobCategoryListComponent, {
      context: {
        motorServiceCategories: $event.data.services, booking: $event.data,
      },
    });
  }
}
