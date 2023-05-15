import {Component, OnInit} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {NbDialogService} from '@nebular/theme';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../app-store/app-state';
import {loadProductRequest} from '../products.actions';
import {selectAllProducts} from '../products.selectors';
import {ProductAddComponent} from '../product-add/product-add.component';

@Component({
  selector: 'ngx-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  source: LocalDataSource = new LocalDataSource();
  settings = {
    actions: false,
    columns: {
      name: {
        title: 'Name',
        type: 'string',
      },
      description: {
        title: 'Description',
        type: 'string',
      },
      price: {
        title: 'Price',
        type: 'string',
      },
      quantityAvailableInStock: {
        title: 'Qty Available In Stock',
        type: 'string',
      },
      code: {
        title: 'Code',
        type: 'string',
      },
      currency: {
        title: 'Currency',
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
    this.store.dispatch(loadProductRequest());

    this.store.pipe(select(selectAllProducts))
      .subscribe({
        next: (data) => {
          this.source.load(data);
        },
      });
  }

  add() {
    this.dialogService.open(ProductAddComponent);
  }

  onRowSelect($event: any) {
  }
}
