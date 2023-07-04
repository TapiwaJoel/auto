import {Component, OnInit} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {NbDialogService} from '@nebular/theme';
import {MotorServiceCategoryAddComponent} from '../motor-service-category-add/motor-service-category-add.component';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../app-store/app-state';
import {loadMotorServiceCategoryRequest} from '../motor-service-categories.actions';
import {selectAllMotorServiceCategories} from '../motor-service-categories.selectors';

@Component({
  selector: 'ngx-service-garage-list',
  templateUrl: './motor-service-category-list.component.html',
  styleUrls: ['./motor-service-category-list.component.scss'],
})
export class MotorServiceCategoryListComponent implements OnInit {
  source: LocalDataSource = new LocalDataSource();
  settings = {
    actions: false,
    columns: {
      category: {
        title: 'Category Name',
        type: 'string',
      },
      description: {
        title: 'Description',
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

    this.store.dispatch(loadMotorServiceCategoryRequest());

    this.store.pipe(select(selectAllMotorServiceCategories))
      .subscribe({
        next: (data) => {
          this.source.load(data);
        },
      });
  }

  onRowSelect($event: any) {

  }

  add() {
    this.dialogService.open(MotorServiceCategoryAddComponent);
  }
}
