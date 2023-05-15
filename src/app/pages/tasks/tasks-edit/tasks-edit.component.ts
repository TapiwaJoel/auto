import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../app-store/app-state';
import {selectTaskLoading} from '../tasks.selectors';
import {createTaskRequest} from '../tasks.actions';
import {TaskStatuses} from '../../utils/task-status';

@Component({
  selector: 'ngx-tasks-edit',
  templateUrl: './tasks-edit.component.html',
  styleUrls: ['./tasks-edit.component.scss'],
})
export class TasksEditComponent implements OnInit {
  @Input() booking;
  @Input() task;
  addTaskForm: FormGroup;
  loader$: Observable<boolean>;
  statuses = Object.keys(TaskStatuses);

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.loader$ = this.store.pipe(select(selectTaskLoading));

    this.addTaskForm = new FormGroup({
      labourCharge: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      taskStatus: new FormControl('', Validators.required),
    });

    this.addTaskForm.setValue({
      labourCharge: this.task.labourCharge,
      description: this.task.description,
      taskStatus: this.task.taskStatus,
    });
  }

  onSubmit() {
    const user = localStorage.getItem('user');
    this.store.dispatch(createTaskRequest({
      task:
        {...this.addTaskForm.value, id: this.task.id, bookingId: this.booking.id, mechanicId: JSON.parse(user).id},
    }));
  }
}
