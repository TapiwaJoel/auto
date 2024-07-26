import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../app-store/app-state';
import {userRoles} from '../../utils/user-roles';
import {selectUserLoading} from '../users.selectors';
import {editRequest} from '../users.actions';
import {loadDepartmentRequest} from '../../departments/departments.actions';
import {selectAllDepartments} from '../../departments/departments.selectors';
import {
  createHeadOfDepartmentRequest,
  loadHeadOfDepartmentRequest,
} from '../../head-of-departments/head-of-departments.actions';
import {User} from '../users.entity';
import {createMechanicRequest} from '../../mechanics/mechanic.actions';
import {selectAllHeadOfDepartments} from '../../head-of-departments/head-of-departments.selectors';
import {Department} from '../../departments/departments.entity';
import {Toast} from '../../utils/toast';

@Component({
  selector: 'ngx-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent implements OnInit {
  @Input() user: User;
  editUserForm: FormGroup;
  addHODForm: FormGroup;
  name;
  showHod: boolean;
  loader$: Observable<boolean>;
  roles: { val: string, key: string }[];
  departments: any[];
  statuses = ['ACTIVE', 'INACTIVE', 'DELETED', 'UPDATED'];

  constructor(private store: Store<AppState>, private toast: Toast) {
  }

  ngOnInit(): void {

    this.roles = userRoles;
    this.loader$ = this.store.pipe(select(selectUserLoading));

    this.store.dispatch(loadDepartmentRequest());

    this.editUserForm = new FormGroup({
      firstName: new FormControl('', Validators.required), departmentId: new FormControl(''),
      lastName: new FormControl('', Validators.required),
      phone: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      role: new FormControl('', Validators.required),
      recordStatus: new FormControl('', Validators.required),
    });

    this.editUserForm.patchValue({
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      phone: this.user.phone,
      email: this.user.email,
      role: this.user.role,
      recordStatus: this.user.recordStatus,
    });

    if (this.user.role === 'ROLE_HOD') {
      let dept: Partial<Department> = {};
      this.showHod = true;
      this.store.dispatch(loadHeadOfDepartmentRequest());

      this.store.pipe(select(selectAllHeadOfDepartments))
        .subscribe({
          next: (data) => {
            const find = data.find(hod => hod.user.id === this.user.id);
            if (find) {
              dept = find.department;
              this.editUserForm.patchValue({
                departmentId: dept.id,
              });
            }
          },
        });
    }


    this.store.pipe(select(selectAllDepartments))
      .subscribe({
        next: (data) => {
          this.departments = data;
        },
      });
  }

  onSubmit() {
    if (this.user.email === this.editUserForm.value.email &&
      this.user.firstName === this.editUserForm.value.firstName &&
      this.user.role === this.editUserForm.value.role &&
      this.user.recordStatus === this.editUserForm.value.recordStatus &&
      this.user.phone === this.editUserForm.value.phone &&
      this.user.lastName === this.editUserForm.value.lastName) {
      this.toast.makeToast('warning', 'Error', 'No field was changed');
      return;
    } else {
      this.store.dispatch(editRequest({user: {...this.editUserForm.value, id: this.user.id}}));
    }

    if (this.editUserForm.value.role === 'ROLE_HOD') {
      this.onAddHODSubmit();
    }

    if (this.editUserForm.value.role === 'ROLE_MECHANIC_SUPERVISOR' ||
      this.editUserForm.value.role === 'ROLE_MECHANIC') {
      this.onAddMechanicSubmit();
    }
  }


  changeRole($event) {
    this.showHod = $event.target.value === 'ROLE_HOD';
  }
  onAddHODSubmit() {
    this.store.dispatch(createHeadOfDepartmentRequest({
      headOfDepartment: {
        departmentId: this.editUserForm.value.departmentId,
        userId: this.user.id,
      },
    }));
  }

  onAddMechanicSubmit() {
    let isSupervisor = false;
    if (this.editUserForm.value.role === 'ROLE_MECHANIC_SUPERVISOR') {
      isSupervisor = true;
    }

    if (this.editUserForm.value.role === 'ROLE_MECHANIC') {
      isSupervisor = false;
    }

    this.store.dispatch(createMechanicRequest({
      mechanic: {
        userId: this.user.id,
        isSupervisor: isSupervisor,
      },
    }));
  }
}
