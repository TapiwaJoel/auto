import {Component, Input, OnInit} from '@angular/core';
import {MotorServiceCategory} from '../../motor-service-categories/motor-service-categories.entity';
import {Booking} from '../../bookings/bookings.entity';
import {Observable} from 'rxjs/Observable';
import {LocalDataSource} from 'ng2-smart-table';
import {NbDialogService} from '@nebular/theme';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../app-store/app-state';
import {selectAllTasks, selectTaskLoading} from '../../tasks/tasks.selectors';
import {loadTaskRequest} from '../../tasks/tasks.actions';
import {MotorServiceJobsAddComponent} from '../motor-service-jobs-add/motor-service-jobs-add.component';
import {
  MotorServiceJobsListMaterialsComponent,
} from '../motor-service-jobs-list-materials/motor-service-jobs-list-materials.component';
import {MotorServiceJobsEditComponent} from '../motor-service-jobs-edit/motor-service-jobs-edit.component';

@Component({
  selector: 'ngx-motor-service-job-category-list',
  templateUrl: './motor-service-job-category-list.component.html',
  styleUrls: ['./motor-service-job-category-list.component.scss'],
})
export class MotorServiceJobCategoryListComponent implements OnInit {

  @Input() motorServiceCategories: Partial<MotorServiceCategory>[];
  @Input() booking: Partial<Booking>;
  loader$: Observable<boolean>;
  source: LocalDataSource = new LocalDataSource();
  settings = {
    actions: false, columns: {
      serviceName: {
        title: 'Service Name', type: 'string',
      }, mechanic: {
        title: 'Mechanic', type: 'string',
      }, description: {
        title: 'Description', type: 'string',
      }, taskStatus: {
        title: 'Status', type: 'string', filter: {
          type: 'list', config: {
            selectText: 'Select...', list: [{value: 'WIP', title: 'WIP'}, {value: 'COMPLETED', title: 'COMPLETED'}, {
              value: 'CANCELLED', title: 'CANCELLED',
            }, {
              value: 'PENDING', title: 'PENDING',
            }],
          },
        },
      }, expectedDeliveryDate: {
        title: 'Expected Delivery Date', type: 'date', filter: {
          type: 'datepicker', config: {
            datepicker: {
              selectMode: 'range', placeholder: 'Pick date...',
            },
          },
        }, editor: {
          type: 'datepicker',
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
  task: Partial<any>[] = [];

  constructor(private dialogService: NbDialogService, private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.source.load(this.motorServiceCategories);
    this.loader$ = this.store.pipe(select(selectTaskLoading));

    this.store.dispatch(loadTaskRequest());

    this.store.pipe(select(selectAllTasks))
      .subscribe({
        next: (data) => {

          this.task = data;
          const dat = data.map(x => {
            return {
              id: x.id,
              description: x.description,
              serviceName: x.motorServiceCategory.name,
              mechanic: x.mechanic.user.firstName + ' ' + x.mechanic.user.lastName,
              mechanicDto: x.mechanic,
              services: x.motorServiceCategory,
              taskStatus: x.taskStatus,
              expectedDeliveryDate: x.expectedDeliveryDate,
              dateCreated: x.dateCreated,
            };
          });
          this.source.load(dat);
        },
      });
  }

  addJob() {
    this.dialogService.open(MotorServiceJobsAddComponent, {
      context: {
        motorServiceCategories: this.motorServiceCategories, booking: this.booking,
      },
    });
  }

  rowSelect($event: any) {
    this.dialogService.open(MotorServiceJobsListMaterialsComponent, {
      context: {
        serviceTask: $event.data, booking: this.booking,
      },
    });
  }

  editServiceJob() {
    // this.dialogService.open(MotorServiceJobsEditComponent, {
    //   context: {
    //     task: this.task
    //   },
    // });
  }
}
