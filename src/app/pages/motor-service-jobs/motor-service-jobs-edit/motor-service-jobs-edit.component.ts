import {Component, Input, OnInit} from '@angular/core';
import {MotorServiceCategory} from '../../motor-service-categories/motor-service-categories.entity';

import {Booking} from '../../bookings/bookings.entity';
import {select, Store} from '@ngrx/store';
import {selectTaskLoading} from '../../tasks/tasks.selectors';
import {AppState} from '../../app-store/app-state';
import {Observable} from 'rxjs/Observable';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Mechanic} from '../../mechanics/mechanic.entity';
import {loadMechanicRequest} from '../../mechanics/mechanic.actions';
import {selectAllMechanics} from '../../mechanics/mechanic.selectors';
import {MotorServiceJob} from '../motor-service-jobs.entity';
import {editMotorServiceJobRequest} from '../motor-service-jobs.actions';
import {editTaskRequest} from '../../tasks/tasks.actions';

@Component({
  selector: 'ngx-motor-service-jobs-edit',
  templateUrl: './motor-service-jobs-edit.component.html',
  styleUrls: ['./motor-service-jobs-edit.component.scss'],
})
export class MotorServiceJobsEditComponent implements OnInit {

  @Input() booking: Partial<Booking>;
  // @Input() motorServiceCategories: Partial<MotorServiceCategory>[];
  // @Input() task: Partial<any>[] = [];
  @Input() serviceTask: Partial<MotorServiceJob>;

  addTaskForm: FormGroup;
  loader$: Observable<boolean>;
  services: Partial<MotorServiceCategory>[] = [];
  mechanics: Partial<Mechanic>[] = [];

  statuses = ['PENDING', 'WIP', 'FINISHED', 'OVERDUE'];

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {

    console.log('serviceTask', this.serviceTask);

    this.loader$ = this.store.pipe(select(selectTaskLoading));

    this.addTaskForm = new FormGroup({
      serviceCategoryId: new FormControl('', Validators.required),
      mechanicId: new FormControl('', Validators.required),
      expectedDeliveryDate: new FormControl('', Validators.required),
      taskStatus: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });

    this.loadMechanic();
    this.services = this.booking['services'];

    this.addTaskForm.setValue({
      serviceCategoryId: this.serviceTask.services.id,
      taskStatus: this.serviceTask.taskStatus,
      mechanicId: this.serviceTask.mechanicDto.id,
      description: this.serviceTask.description,
      expectedDeliveryDate: this.serviceTask.expectedDeliveryDate,
    });

    console.log('this.services', this.services);
  }

  onSubmit() {
    const newService = {
      id: this.serviceTask.id,
      bookingId: this.booking.id,
      expectedDeliveryDate: this.addTaskForm.value.expectedDeliveryDate,
      taskStatus: this.addTaskForm.value.taskStatus,
      description: this.addTaskForm.value.description,
      mechanicId: parseInt(this.addTaskForm.value.mechanicId, 0),
      serviceCategoryId: parseInt(this.addTaskForm.value.serviceCategoryId, 0),
    };

    this.store.dispatch(editTaskRequest({
      task: newService,
    }));
  }

  loadMechanic() {
    this.store.dispatch(loadMechanicRequest());

    this.store.pipe(select(selectAllMechanics))
      .subscribe({
        next: (data) => {
          this.mechanics = data.map(x => {
            return {
              id: x.id,
              firstName: x.user.firstName,
              lastName: x.user.lastName,
              fullName: x.user.firstName + ' ' + x.user.lastName,
              phone: x.user.phone,
              email: x.user.email,
              recordStatus: x.recordStatus,
              dateCreated: x.dateCreated,
              role: x.isSupervisor ? 'MECHANIC SUPERVISOR' : 'MECHANIC',
            };
          });

          this.mechanics = this.mechanics.filter(mechanic => mechanic.recordStatus === 'ACTIVE');
        },
      });
  }
}
