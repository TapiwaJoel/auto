import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../app-store/app-state';

import {selectDepartmentLoading} from '../departments.selectors';
import {createRequest} from '../departments.actions';

@Component({
  selector: 'ngx-department-add',
  templateUrl: './department-add.component.html',
  styleUrls: ['./department-add.component.scss'],
})
export class DepartmentAddComponent implements OnInit {
  addDepartmentForm: FormGroup;
  name;
  loader$: Observable<boolean>;
  roles: any[];

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {

    this.loader$ = this.store.pipe(select(selectDepartmentLoading));

    this.addDepartmentForm = new FormGroup({
      name: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    this.store.dispatch(createRequest({department: {...this.addDepartmentForm.value}}));
  }
}
