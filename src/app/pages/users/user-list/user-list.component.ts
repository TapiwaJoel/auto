import {Component, OnInit} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {NbDialogService} from '@nebular/theme';
import {UserAddComponent} from '../user-add/user-add.component';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../app-store/app-state';
import {loadUserRequest} from '../users.actions';
import {selectAllUsers} from '../users.selectors';
import {UserEditComponent} from '../user-edit/user-edit.component';

@Component({
  selector: 'ngx-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  source: LocalDataSource = new LocalDataSource();
  settings = {
    actions: false,
    columns: {
      firstName: {
        title: 'First Name',
        type: 'string',
      },
      lastName: {
        title: 'Last Name',
        type: 'string',
      },
      phone: {
        title: 'Phone Number',
        type: 'string',
      },
      email: {
        title: 'Email Address',
        type: 'string',
      },
      role: {
        title: 'Role',
        type: 'string',
      },
      recordStatus: {
        title: 'Status',
        type: 'string',
        filter: {
          type: 'list',
          config: {
            selectText: 'Select...',
            list: [
              {value: 'ACTIVE', title: 'ACTIVE'},
              {value: 'DEACTIVATED', title: 'DEACTIVATED'},
            ],
          },
        },
      },
      dateCreated: {
        title: 'Date',
        type: 'date',
        filter: {
          type: 'datepicker',
          config: {
            datepicker: {
              selectMode: 'range',
              placeholder: 'Pick date...',
            },
          },
        },
        editor: {
          type: 'datepicker',
        },
      },
    },
  };

  constructor(private dialogService: NbDialogService, private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.store.dispatch(loadUserRequest());

    this.store.pipe(select(selectAllUsers))
      .subscribe({
        next: (data) => {
          this.source.load(data);
        },
      });

    this.source.onChanged().subscribe((data) => {

    });
  }

  onUserRowSelect($event: any) {
    this.dialogService.open(UserEditComponent, {
      context: {
        user: $event.data,
      },
    });
  }

  addUser() {
    this.dialogService.open(UserAddComponent);
  }
}
