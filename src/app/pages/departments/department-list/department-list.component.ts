import {Component, OnInit} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {NbDialogService} from '@nebular/theme';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../app-store/app-state';
import {DepartmentAddComponent} from '../department-add/department-add.component';
import {loadDepartmentRequest} from '../departments.actions';
import {selectAllDepartments} from '../departments.selectors';
import {DepartmentEditComponent} from '../department-edit/department-edit.component';

@Component({
  selector: 'ngx-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.scss'],
})
export class DepartmentListComponent implements OnInit {
  source: LocalDataSource = new LocalDataSource();
  settings = {
    actions: false,
    columns: {
      name: {
        title: 'Name',
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
    this.store.dispatch(loadDepartmentRequest());

    this.store.pipe(select(selectAllDepartments))
      .subscribe({
        next: (data) => {
          this.source.load(data);
        },
      });

    this.source.onChanged().subscribe((data) => {

    });
  }

  onDepartmentRowSelect($event: any) {
    console.log('open');

    this.dialogService.open(DepartmentEditComponent, {
      context: {
        department: $event.data,
      },
    });
  }

  addDepartment() {
    this.dialogService.open(DepartmentAddComponent);
  }
}
