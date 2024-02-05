import {Component, Input, OnInit} from '@angular/core';
import {Requisition} from '../requisitions.entity';
import {Observable} from 'rxjs/Observable';
import {LocalDataSource} from 'ng2-smart-table';
import {RequisitionService} from '../requisitions.service';
import {NbDialogService} from '@nebular/theme';
import {RequisitionsEditComponent} from '../requisitions-edit/requisitions-edit.component';

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
      stockCode: {
        title: 'Stock Code',
        type: 'string',
      },
      name: {
        title: 'Name', type: 'string',
      },
      description: {
        title: 'Description',
        type: 'string',
      },
      quantity: {
        title: 'Quantity',
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

  constructor(private requisitionService: RequisitionService,
              private dialogService: NbDialogService) {
  }

  ngOnInit(): void {
    this.getRequisitionById();
  }

  getRequisitionById() {
    this.requisitionService.getByRequisitionNumber(this.requisition.id)
      .subscribe((dash: any) => {
        this.source.load(dash.data);
        console.log('dash', dash);
      });
  }

  editRequisition() {
    this.dialogService.open(RequisitionsEditComponent, {
      context: {
        requisition: this.requisition,
      },
    });
  }
}
