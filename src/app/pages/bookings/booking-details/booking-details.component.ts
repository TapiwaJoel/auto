import {Component, Input, OnInit} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {NbDialogService} from '@nebular/theme';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../app-store/app-state';
import {TasksAddComponent} from '../../tasks/tasks-add/tasks-add.component';
import {selectAllTasks} from '../../tasks/tasks.selectors';
import {loadTaskRequest} from '../../tasks/tasks.actions';
import {TasksEditComponent} from '../../tasks/tasks-edit/tasks-edit.component';
import {Booking} from '../bookings.entity';
import {BookingStatus} from '../../utils/booking-status';
import {editBookingRequest} from '../bookings.actions';

@Component({
  selector: 'ngx-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.scss'],
})
export class BookingDetailsComponent implements OnInit {
  @Input() booking: any;
  source: LocalDataSource = new LocalDataSource();
  settings = {
    actions: false,
    columns: {
      description: {
        title: 'Description',
        type: 'string',
      },
      taskStatus: {
        title: 'Task Status',
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
  toggleNgModel: any;
  showApprove = false;
  checked = false;

  constructor(private dialogService: NbDialogService, private store: Store<AppState>) {
  }

  ngOnInit(): void {

    this.store.dispatch(loadTaskRequest());

    this.store.pipe(select(selectAllTasks))
      .subscribe({
        next: (data) => {
          this.source.load(data);
        },
      });

    let user: any = localStorage.getItem('user');
    user = JSON.parse(user);

    if (user.role === 'ROLE_HOD') {
      this.showApprove = true;
    }
    if (this.booking.bookingStatus === BookingStatus.DEPARTMENT_APPROVED) {
      this.checked = true;
    }
    console.log(' this.checked ', this.checked);
    // this.checked = this.booking.bookingStatus === BookingStatus.DEPARTMENT_APPROVED;
  }

  onRowSelect($event: any) {
    this.dialogService.open(TasksEditComponent, {
      context: {
        booking: this.booking,
        task: $event.data,
      },
    });
  }

  add() {
    this.dialogService.open(TasksAddComponent, {
      context: {
        booking: this.booking,
      },
    });
  }

  check($event: boolean) {
    console.log('this.booking', this.booking);
    console.log('Approve', $event);
    const bookingToUpdate: Partial<Booking> = {
      id: this.booking.id,
    };
    if ($event) {
      bookingToUpdate.bookingStatus = BookingStatus.DEPARTMENT_APPROVED;
    } else {
      bookingToUpdate.bookingStatus = BookingStatus.DEPARTMENT_DISAPPROVED;
    }

    this.store.dispatch(editBookingRequest({booking: {...bookingToUpdate}}));
    console.log('bookingToUpdate', bookingToUpdate);
  }
}
