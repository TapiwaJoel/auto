import {Component, OnInit} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../app-store/app-state';
import {selectAllMechanics} from '../mechanic.selectors';
import {loadMechanicRequest} from '../mechanic.actions';

@Component({
  selector: 'ngx-mechanic-list',
  templateUrl: './mechanic-list.component.html', styleUrls: ['./mechanic-list.component.scss'],
})
export class MechanicListComponent implements OnInit {

  source: LocalDataSource = new LocalDataSource();
  settings = {
    actions: false, columns: {
      firstName: {
        title: 'First Name', type: 'string',
      }, lastName: {
        title: 'Last Name', type: 'string',
      }, phone: {
        title: 'Phone Number', type: 'string',
      }, email: {
        title: 'Email Address', type: 'string',
      }, role: {
        title: 'Role',
        type: 'string',
        filter: {
          type: 'list', config: {
            selectText: 'Select...',
            list: [{value: 'MECHANIC', title: 'MECHANIC'},
              {value: 'MECHANIC SUPERVISOR', title: 'MECHANIC SUPERVISOR'}],
          },
        },
      }, recordStatus: {
        title: 'Status',
        type: 'string', filter: {
          type: 'list', config: {
            selectText: 'Select...',
            list: [{value: 'ACTIVE', title: 'ACTIVE'}, {value: 'DELETED', title: 'DELETED'}],
          },
        },
      }, dateCreated: {
        title: 'Date', type: 'date', filter: {
          type: 'datepicker', config: {
            datepicker: {
              selectMode: 'range', placeholder: 'Pick date...',
            },
          },
        }, editor: {
          type: 'datepicker',
        },
      },
    },
  };

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.store.dispatch(loadMechanicRequest());

    this.store.pipe(select(selectAllMechanics))
      .subscribe({
        next: (data) => {
          console.log('data', data);

          const dataUser = data.map(x => {
            return {
              firstName: x.user.firstName,
              lastName: x.user.lastName,
              phone: x.user.phone,
              email: x.user.email,
              recordStatus: x.recordStatus,
              dateCreated: x.dateCreated,
              role: x.isSupervisor ? 'MECHANIC SUPERVISOR' : 'MECHANIC',
            };
          });
          this.source.load(dataUser);
        },
      });

    this.source.onChanged().subscribe((data) => {

    });
  }
}
