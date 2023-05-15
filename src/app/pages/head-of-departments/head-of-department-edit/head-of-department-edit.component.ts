import {Component, Input, OnInit} from '@angular/core';
import {Department} from '../../departments/departments.entity';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../app-store/app-state';
import {selectAllDepartments} from '../../departments/departments.selectors';
import {loadDepartmentRequest} from '../../departments/departments.actions';
import {HeadOfDepartment} from '../head-of-departments.entity';
import {selectHeadOfDepartmentLoading} from '../head-of-departments.selectors';
import {editHeadOfDepartmentRequest} from '../head-of-departments.actions';


@Component({
  selector: 'ngx-head-of-department-edit',
  templateUrl: './head-of-department-edit.component.html',
  styleUrls: ['./head-of-department-edit.component.scss'],
})
export class HeadOfDepartmentEditComponent implements OnInit {

  @Input() headOfDepartment: Partial<HeadOfDepartment>;
  editHeadOfDepartmentForm: FormGroup;
  name;
  departments: Partial<Department>[];
  loader$: Observable<boolean>;
  statuses = ['ACTIVE', 'INACTIVE', 'DELETED'];

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {

    this.store.dispatch(loadDepartmentRequest());

    this.loader$ = this.store.pipe(select(selectHeadOfDepartmentLoading));

    this.editHeadOfDepartmentForm = new FormGroup({
      departmentId: new FormControl('', Validators.required),
      recordStatus: new FormControl('', Validators.required),
    });

    this.editHeadOfDepartmentForm.setValue({
      departmentId: this.headOfDepartment.department,
      recordStatus: this.headOfDepartment.recordStatus,
    });

    this.store.pipe(select(selectAllDepartments))
      .subscribe({
        next: (data) => {
          this.departments = data;
        },
      });
  }

  onSubmit() {
    this.store.dispatch(editHeadOfDepartmentRequest({
      headOfDepartment:
        {...this.editHeadOfDepartmentForm.value, id: this.headOfDepartment.id},
    }));
  }
}
