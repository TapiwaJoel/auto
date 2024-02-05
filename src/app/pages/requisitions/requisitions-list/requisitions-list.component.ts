import {Component, OnInit} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {NbDialogService} from '@nebular/theme';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../app-store/app-state';
import {loadRequisitionRequest} from '../requisitions.actions';
import {selectAllRequisitions} from '../requisitions.selectors';
import {RequisitionsAddComponent} from '../requisitions-add/requisitions-add.component';
import {RequisitionService} from '../requisitions.service';
import {RequisitionsDetailsComponent} from '../requisitions-details/requisitions-details.component';


@Component({
  selector: 'ngx-requisitions-list',
  templateUrl: './requisitions-list.component.html',
  styleUrls: ['./requisitions-list.component.scss'],
})
export class RequisitionsListComponent implements OnInit {

  source: LocalDataSource = new LocalDataSource();
  settings = {
    actions: false,
    columns: {
      requisitionNumber: {
        title: 'Requisition Number',
        type: 'string',
      },
      description: {
        title: 'Description',
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

  constructor(private dialogService: NbDialogService,
              private requisitionService: RequisitionService,
              private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.store.dispatch(loadRequisitionRequest());

    this.store.pipe(select(selectAllRequisitions))
      .subscribe({
        next: (data) => {
          const newData = data.map((dat) => {
            return {
              id: dat.id,
              requisitionNumber: dat.requisitionNumber,
              description: dat.description,
              dateCreated: dat.dateCreated,
              recordStatus: dat.recordStatus,
            };
          });

          this.requisitionService.requisitions = data;
          this.source.load(newData);
        },
      });
  }

  onRequisitionRowSelect($event: any) {
    this.dialogService.open(RequisitionsDetailsComponent, {
      context: {
        requisition: $event.data,
      },
    });
  }
  addRequisition() {
    this.dialogService.open(RequisitionsAddComponent);
  }
}
