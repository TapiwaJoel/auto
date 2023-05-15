import {Component, OnInit} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../app-store/app-state';
import * as moment from 'moment';
import {loadHeadOfDepartmentRequest} from '../head-of-departments.actions';
import {selectAllHeadOfDepartments} from '../head-of-departments.selectors';
import {NbDialogService} from '@nebular/theme';
import {HeadOfDepartmentEditComponent} from '../head-of-department-edit/head-of-department-edit.component';

@Component({
  selector: 'ngx-head-of-department-list',
  templateUrl: './head-of-department-list.component.html',
  styleUrls: ['./head-of-department-list.component.scss'],
})
export class HeadOfDepartmentListComponent implements OnInit {
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
      department: {
        title: 'Department',
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

  constructor(private store: Store<AppState>, private dialogService: NbDialogService) {
  }

  ngOnInit(): void {
    this.store.dispatch(loadHeadOfDepartmentRequest());

    this.store.pipe(select(selectAllHeadOfDepartments))
      .subscribe({
        next: (data) => {
          data = data.map((x) => {
            return {
              dateCreated: moment(x.dateCreated).format('LLLL'),
              id: x.id,
              department: x.department.name,
              recordStatus: x.recordStatus,
              firstName: x.user.firstName,
              lastName: x.user.lastName,
              phone: x.user.phone,
              email: x.user.email,
            };
          });
          this.source.load(data);
        },
      });
  }

  onHeadOfDepartmentRowSelect($event: any) {
    this.dialogService.open(HeadOfDepartmentEditComponent, {
      context: {
        headOfDepartment: $event.data,
      },
    });
  }
}
