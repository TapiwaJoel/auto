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
import {createBookingRequest, editBookingRequest} from '../bookings.actions';
import jwt_decode from 'jwt-decode';
import {Router} from '@angular/router';
import {selectAllMotorServiceCategories} from '../../motor-service-categories/motor-service-categories.selectors';
import {MotorServiceCategory} from '../../motor-service-categories/motor-service-categories.entity';
import {loadMotorServiceCategoryRequest} from '../../motor-service-categories/motor-service-categories.actions';

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
  options = [
    {value: 'DEPARTMENT_DISAPPROVED', label: 'DEPARTMENT_DISAPPROVED'},
    {value: 'DEPARTMENT_APPROVED', label: 'DEPARTMENT_APPROVED'},
    {value: 'HALT', label: 'HALT'},
  ];

  motorServiceCategories: Partial<MotorServiceCategory>[] = [];
  option;
  services = [];
  servicesSelected: string[] = [];
  additionalInformation: string;
  bookingStatus: string;

  constructor(private dialogService: NbDialogService,
              private router: Router,
              private store: Store<AppState>) {
  }


  onChecksChange(selected: boolean, motorServiceCategory: string) {
    if (selected) {
      this.servicesSelected.push(motorServiceCategory);
    } else {
      const index = this.servicesSelected.indexOf(motorServiceCategory);
      this.servicesSelected.splice(index, 1);
    }
  }

  ngOnInit(): void {

    this.store.dispatch(loadTaskRequest());
    this.store.dispatch(loadMotorServiceCategoryRequest());

    this.store.pipe(select(selectAllMotorServiceCategories))
      .subscribe({
        next: (data) => {
          this.motorServiceCategories = data;
        },
      });

    this.store.pipe(select(selectAllTasks))
      .subscribe({
        next: (data) => {
          this.source.load(data);
        },
      });

    const auth = localStorage.getItem('auth');
    if (!auth) {
      this.router.navigate(['/']);
      return;
    }

    const role: any = jwt_decode(JSON.parse(auth).data.accessToken);

    if (role.Role === 'ROLE_HOD') {
      this.showApprove = true;
    }

    console.log('booking', this.booking);

    this.services = this.booking.motorServiceCategories.split(',');

    this.additionalInformation = this.booking.additionalInformation;

    this.services = this.services.map(x => x.trim());
    if (this.booking.bookingStatus === BookingStatus.DEPARTMENT_APPROVED) {
      this.checked = true;
    }
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
    const bookingToUpdate: Partial<Booking> = {
      id: this.booking.id,
    };
    if ($event) {
      bookingToUpdate.bookingStatus = BookingStatus.DEPARTMENT_APPROVED;
    } else {
      bookingToUpdate.bookingStatus = BookingStatus.DEPARTMENT_DISAPPROVED;
    }

    this.store.dispatch(editBookingRequest({booking: {...bookingToUpdate}}));
  }


  onBook() {
    const booking: Partial<Booking> = {
      motorServiceCategoryIds: this.servicesSelected,
    };

    if (this.additionalInformation) {
      booking.additionalInformation = this.additionalInformation;
    }

    this.store.dispatch(createBookingRequest({booking}));
  }


  checkChecked(category: string) {
    return this.services.includes(category);
  }
}
