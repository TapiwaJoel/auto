import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../app-store/app-state';
import {createVehicleRequest} from '../vehicles.actions';
import {selectVehicleLoading} from '../vehicles.selectors';
import {Department} from '../../departments/departments.entity';
import {loadDepartmentRequest} from '../../departments/departments.actions';
import {selectAllDepartments} from '../../departments/departments.selectors';

@Component({
  selector: 'ngx-vehicle-add',
  templateUrl: './vehicle-add.component.html',
  styleUrls: ['./vehicle-add.component.scss'],
})
export class VehicleAddComponent implements OnInit {

  addVehicleForm: FormGroup;
  loader$: Observable<boolean>;
  departments: Partial<Department>[];

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {

    this.store.dispatch(loadDepartmentRequest());

    this.loader$ = this.store.pipe(select(selectVehicleLoading));

    this.addVehicleForm = new FormGroup({
      departmentId: new FormControl('', Validators.required),
      registrationNumber: new FormControl('', Validators.required),
      vin: new FormControl('', Validators.required),
      make: new FormControl('', Validators.required),
      model: new FormControl('', Validators.required),
      color: new FormControl('', Validators.required),
      yearOfManufacturing: new FormControl('', Validators.required),
      additionalInformation: new FormControl('', Validators.required),
      chassis: new FormControl('', Validators.required),
    });

    this.store.pipe(select(selectAllDepartments))
      .subscribe({
        next: (data) => {
          this.departments = data;
        },
      });
  }

  onSubmit() {
    this.store.dispatch(createVehicleRequest({vehicle: {...this.addVehicleForm.value}}));
  }

}
