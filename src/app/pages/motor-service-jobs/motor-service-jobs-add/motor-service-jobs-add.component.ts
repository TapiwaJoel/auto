import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../app-store/app-state';
import {selectAllTasks, selectTaskLoading} from '../../tasks/tasks.selectors';
import {loadMechanicRequest} from '../../mechanics/mechanic.actions';
import {selectAllMechanics} from '../../mechanics/mechanic.selectors';
import {Mechanic} from '../../mechanics/mechanic.entity';
import {MotorServiceCategory} from '../../motor-service-categories/motor-service-categories.entity';
import {Booking} from '../../bookings/bookings.entity';
import {createMotorServiceJobRequest} from '../motor-service-jobs.actions';
import {createTaskRequest} from '../../tasks/tasks.actions';

@Component({
  selector: 'ngx-motor-service-jobs-add',
  templateUrl: './motor-service-jobs-add.component.html',
  styleUrls: ['./motor-service-jobs-add.component.scss'],
})
export class MotorServiceJobsAddComponent implements OnInit {

  @Input() booking: Partial<Booking>;
  @Input() motorServiceCategories: Partial<MotorServiceCategory>[];
  addTaskForm: FormGroup;
  loader$: Observable<boolean>;
  services: Partial<MotorServiceCategory>[] = [];
  mechanics: Partial<Mechanic>[] = [];

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.loader$ = this.store.pipe(select(selectTaskLoading));



    this.addTaskForm = new FormGroup({
      serviceCategoryId: new FormControl('', Validators.required),
      mechanicId: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      expectedDeliveryDate: new FormControl('', Validators.required),
    });

    this.loadMechanic();
    this.services = this.booking['services'];
  }

  onSubmit() {
    const newService = {
      bookingId: this.booking.id,
      description: this.addTaskForm.value.description,
      expectedDeliveryDate: this.addTaskForm.value.expectedDeliveryDate,
      mechanicId: parseInt(this.addTaskForm.value.mechanicId, 0),
      serviceCategoryId: parseInt(this.addTaskForm.value.serviceCategoryId, 0),
    };

    this.store.dispatch(createTaskRequest({
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
