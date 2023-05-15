import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../app-store/app-state';
import {selectTaskLoading} from '../tasks.selectors';
import {createTaskRequest} from '../tasks.actions';

@Component({
  selector: 'ngx-tasks-add',
  templateUrl: './tasks-add.component.html',
  styleUrls: ['./tasks-add.component.scss'],
})
export class TasksAddComponent implements OnInit {
  @Input() booking;
  addTaskForm: FormGroup;
  loader$: Observable<boolean>;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.loader$ = this.store.pipe(select(selectTaskLoading));

    this.addTaskForm = new FormGroup({
      labourCharge: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    const user = localStorage.getItem('user');
    this.store.dispatch(createTaskRequest({
      task:
        {...this.addTaskForm.value, bookingId: this.booking.id, mechanicId: JSON.parse(user).id},
    }));
  }
}
