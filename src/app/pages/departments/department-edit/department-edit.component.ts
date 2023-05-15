import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../app-store/app-state';
import {selectDepartmentLoading} from '../departments.selectors';
import {editRequest} from '../departments.actions';
import {Department} from '../departments.entity';

@Component({
  selector: 'ngx-department-edit',
  templateUrl: './department-edit.component.html',
  styleUrls: ['./department-edit.component.scss'],
})
export class DepartmentEditComponent implements OnInit {

  @Input() department: Partial<Department>;
  editDepartmentForm: FormGroup;
  name;
  loader$: Observable<boolean>;
  statuses = ['ACTIVE', 'INACTIVE', 'DELETED'];

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {

    this.loader$ = this.store.pipe(select(selectDepartmentLoading));

    this.editDepartmentForm = new FormGroup({
      name: new FormControl('', Validators.required),
      recordStatus: new FormControl('', Validators.required),
    });

    this.editDepartmentForm.setValue({
      name: this.department.name,
      recordStatus: this.department.recordStatus,
    });
  }

  onSubmit() {
    this.store.dispatch(editRequest({department: {...this.editDepartmentForm.value, id: this.department.id}}));
  }
}
