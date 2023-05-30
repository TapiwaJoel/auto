import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../app-store/app-state';
import {createRequest} from '../users.actions';
import {Observable} from 'rxjs/Observable';
import {selectUserLoading} from '../users.selectors';
import {userRoles} from '../../utils/user-roles';

@Component({
  selector: 'ngx-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss'],
})
export class UserAddComponent implements OnInit {
  addUserForm: FormGroup;
  name;
  loader$: Observable<boolean>;
  roles: any[];


  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {

    userRoles.shift();
    userRoles.shift();

    this.roles = userRoles;
    this.loader$ = this.store.pipe(select(selectUserLoading));

    this.addUserForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      phone: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      role: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    this.store.dispatch(createRequest({user: {...this.addUserForm.value}}));
  }
}
