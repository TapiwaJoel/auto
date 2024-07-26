import {Component, OnInit} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {NbDialogService} from '@nebular/theme';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../app-store/app-state';
import {loadVehicleRequest} from '../vehicles.actions';
import {selectAllVehicles} from '../vehicles.selectors';
import {VehicleAddComponent} from '../vehicle-add/vehicle-add.component';
import {VehicleEditComponent} from '../vehicle-edit/vehicle-edit.component';
import {loadDepartmentRequest} from '../../departments/departments.actions';
import {selectAllDepartments} from '../../departments/departments.selectors';
import {Department} from '../../departments/departments.entity';
import jwt_decode from 'jwt-decode';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.scss'],
})
export class VehicleListComponent implements OnInit {
  source: LocalDataSource = new LocalDataSource();
  departments: Partial<Department>[];
  departmentName = '';
  role = '';
  settings = {
    actions: false,
    columns: {
      department: {
        title: 'Department',
        type: 'string',
      },
      registrationNumber: {
        title: 'Reg. Number',
        type: 'string',
      },
      vin: {
        title: 'VIN',
        type: 'string',
      },
      make: {
        title: 'Make',
        type: 'string',
      },
      model: {
        title: 'Model',
        type: 'string',
      },
      chassis: {
        title: 'Chassis',
        type: 'string',
      },
      color: {
        title: 'Color',
        type: 'string',
      },
      yearOfManufacturing: {
        title: 'Year',
        type: 'string',
      },
      additionalInformation: {
        title: 'Comment',
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

  constructor(private dialogService: NbDialogService, private router: Router, private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.store.dispatch(loadDepartmentRequest());
    this.store.dispatch(loadVehicleRequest());
    this.authValidation();

    this.store.pipe(select(selectAllDepartments))
      .subscribe({
        next: (data) => {
          this.departments = data;
        },
      });

    this.store.pipe(select(selectAllVehicles))
      .subscribe({
        next: (vehicles) => {

          console.log('vehicles 1', vehicles);
          vehicles = vehicles.map(x => {
            return {
              id: x.id,
              department: this.departments.find(dep => dep.id === x.departmentId)?.name,
              recordStatus: x.recordStatus,
              dateCreated: x.dateCreated,
              additionalInformation: x.additionalInformation,
              chassis: x.chassis,
              color: x.color,
              yearOfManufacturing: x.yearOfManufacturing,
              make: x.make,
              model: x.model,
              vin: x.vin,
              registrationNumber: x.registrationNumber,
            };
          });


          if (this.role === 'ROLE_ADMIN') {
            this.source.load(vehicles);
          } else {


            const departmentVehicles = vehicles.filter(vehicle => vehicle.department === this.departmentName);
            this.source.load(departmentVehicles);
          }
        },
      });
  }

  add() {
    this.dialogService.open(VehicleAddComponent);
  }

  onRowSelect($event: any) {
    this.dialogService.open(VehicleEditComponent, {
      context: {
        vehicle: $event.data,
      },
    });
  }

  authValidation() {
    const auth = localStorage.getItem('auth');
    if (!auth) {
      this.router.navigate(['/']);
      return;
    }

    const role: any = jwt_decode(JSON.parse(auth).data.accessToken);
    this.departmentName = role.DepartmentName;
    this.role = role.Roles;
  }
}
