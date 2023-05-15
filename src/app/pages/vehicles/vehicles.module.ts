import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {VehiclesRoutingModule} from './vehicles-routing.module';
import {VehicleListComponent} from './vehicle-list/vehicle-list.component';
import {VehicleAddComponent} from './vehicle-add/vehicle-add.component';
import {VehicleEditComponent} from './vehicle-edit/vehicle-edit.component';
import {VehiclesComponent} from './vehicles.component';
import {NbButtonModule, NbCardModule, NbCheckboxModule, NbSpinnerModule, NbTabsetModule} from '@nebular/theme';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {vehicleReducer} from './vehicles.reducer';
import {VehicleEffects} from './vehicles.effects';
import {DepartmentsModule} from '../departments/departments.module';
import {MotorServiceCategoriesModule} from '../motor-service-categories/motor-service-categories.module';
import {BookingsModule} from '../bookings/bookings.module';

@NgModule({
  declarations: [
    VehicleListComponent,
    VehicleAddComponent,
    VehicleEditComponent,
    VehiclesComponent,
  ],
  imports: [
    CommonModule,
    VehiclesRoutingModule,
    NbSpinnerModule,
    NbCardModule,
    DepartmentsModule,
    MotorServiceCategoriesModule,
    BookingsModule,
    StoreModule.forFeature('vehicles', vehicleReducer),
    EffectsModule.forFeature([VehicleEffects]),
    Ng2SmartTableModule,
    NbButtonModule,
    DepartmentsModule,
    ReactiveFormsModule,
    NbTabsetModule,
    NbCheckboxModule,
    FormsModule,
  ],
})
export class VehiclesModule {
}
