import {Component, Input, OnInit} from '@angular/core';
import {Requisition} from '../requisitions.entity';
import {Observable} from 'rxjs/Observable';
import {LocalDataSource} from 'ng2-smart-table';
import {RequisitionService} from '../requisitions.service';

@Component({
  selector: 'ngx-requisitions-details',
  templateUrl: './requisitions-details.component.html',
  styleUrls: ['./requisitions-details.component.scss'],
})
export class RequisitionsDetailsComponent implements OnInit {

  @Input() requisition: Partial<Requisition>;
  loader$: Observable<boolean>;
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
      quantity: {
        title: 'Quantity',
        type: 'string',
      },
      productStatus: {
        title: 'Status',
        type: 'string',
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

  constructor(private requisitionService: RequisitionService) {
  }

  ngOnInit(): void {
    const find = this.requisitionService.requisitions.find(req => req.id === this.requisition.id);
    this.source.load(find.productRequested);
  }

  addProductsRequisition() {

  }
}
