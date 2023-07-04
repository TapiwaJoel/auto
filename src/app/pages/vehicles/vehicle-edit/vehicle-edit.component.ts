import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {Department} from '../../departments/departments.entity';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../app-store/app-state';
import {loadDepartmentRequest} from '../../departments/departments.actions';
import {selectVehicleLoading} from '../vehicles.selectors';
import {selectAllDepartments} from '../../departments/departments.selectors';
import {editVehicleRequest} from '../vehicles.actions';
import {RecordStatus} from '../../utils/record-status';
import {Vehicle} from '../vehicles.entity';
import {loadMotorServiceCategoryRequest} from '../../motor-service-categories/motor-service-categories.actions';
import {selectAllMotorServiceCategories} from '../../motor-service-categories/motor-service-categories.selectors';
import {MotorServiceCategory} from '../../motor-service-categories/motor-service-categories.entity';
import {createBookingRequest} from '../../bookings/bookings.actions';
import {Booking} from '../../bookings/bookings.entity';

@Component({
  selector: 'ngx-vehicle-edit',
  templateUrl: './vehicle-edit.component.html',
  styleUrls: ['./vehicle-edit.component.scss'],
})
export class VehicleEditComponent implements OnInit {

  @Input() vehicle: Partial<Vehicle>;
  editVehicleForm: FormGroup;
  loader$: Observable<boolean>;
  departments: Partial<Department>[];
  statuses = Object.keys(RecordStatus);
  motorServiceCategories: Partial<MotorServiceCategory>[] = [];
  servicesSelected: string[] = [];
  additionalInformation: string;
  transferReasons = ['Accident Damaged', 'Not Road Worth', 'Sold', 'Transfer to Other Department'];

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {

    this.store.dispatch(loadDepartmentRequest());

    this.loader$ = this.store.pipe(select(selectVehicleLoading));

    this.editVehicleForm = new FormGroup({
      departmentId: new FormControl('', Validators.required),
      registrationNumber: new FormControl('', Validators.required),
      vin: new FormControl('', Validators.required),
      make: new FormControl('', Validators.required),
      model: new FormControl('', Validators.required),
      color: new FormControl('', Validators.required),
      yearOfManufacturing: new FormControl('', Validators.required),
      additionalInformation: new FormControl('', Validators.required),
      chassis: new FormControl('', Validators.required),
      recordStatus: new FormControl('', Validators.required),
      reasonForUpdate: new FormControl('', Validators.required),
    });

    this.store.pipe(select(selectAllDepartments))
      .subscribe({
        next: (data) => {
          this.departments = data;
        },
      });

    this.editVehicleForm.patchValue({
      departmentId: this.departments.find(dept => dept.name === this.vehicle.department)?.id,
      registrationNumber: this.vehicle.registrationNumber,
      vin: this.vehicle.vin,
      make: this.vehicle.make,
      model: this.vehicle.model,
      color: this.vehicle.color,
      yearOfManufacturing: this.vehicle.yearOfManufacturing,
      additionalInformation: this.vehicle.additionalInformation,
      chassis: this.vehicle.chassis,
      recordStatus: this.vehicle.recordStatus,
      reasonForUpdate: this.vehicle.reasonForUpdate,
    });

    this.store.dispatch(loadMotorServiceCategoryRequest());

    this.store.pipe(select(selectAllMotorServiceCategories))
      .subscribe({
        next: (data) => {
          this.motorServiceCategories = data;
        },
      });
  }

  onSubmit() {
    this.store.dispatch(editVehicleRequest({vehicle: {...this.editVehicleForm.value, id: this.vehicle.id}}));
  }

  onChecksChange(selected: boolean, motorServiceCategory: string) {
    if (selected) {
      this.servicesSelected.push(motorServiceCategory);
    } else {
      const index = this.servicesSelected.indexOf(motorServiceCategory);
      this.servicesSelected.splice(index, 1);
    }
  }

  onBook() {
    const booking: Partial<Booking> = {
      vehicleId: this.vehicle.id,
      motorServiceCategoryIds: this.servicesSelected,
    };
    if (this.additionalInformation) {
      booking.additionalInformation = this.additionalInformation;
    }

    this.store.dispatch(createBookingRequest({booking}));
  }
}
