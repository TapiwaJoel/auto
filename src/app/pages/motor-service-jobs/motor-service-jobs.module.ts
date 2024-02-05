import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MotorServiceJobsRoutingModule} from './motor-service-jobs-routing.module';
import {MotorServiceJobsListComponent} from './motor-service-jobs-list/motor-service-jobs-list.component';
import {MotorServiceJobsAddComponent} from './motor-service-jobs-add/motor-service-jobs-add.component';
import {MotorServiceJobsEditComponent} from './motor-service-jobs-edit/motor-service-jobs-edit.component';
import {MotorServiceJobsComponent} from './motor-service-jobs.component';
import {NbButtonModule, NbCardModule, NbDatepickerModule, NbInputModule, NbSpinnerModule} from '@nebular/theme';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {MotorServiceJobsEffects} from './motor-service-jobs.effects';
import {motorServiceJobsReducer} from './motor-service-jobs.reducer';
import {BookingsModule} from '../bookings/bookings.module';
import { MotorServiceJobCategoryListComponent } from './motor-service-job-category-list/motor-service-job-category-list.component';
import {MechanicsModule} from '../mechanics/mechanics.module';
import {ReactiveFormsModule} from '@angular/forms';
import { MotorServiceJobsAddMaterialsComponent } from './motor-service-jobs-add-materials/motor-service-jobs-add-materials.component';
import { MotorServiceJobsListMaterialsComponent } from './motor-service-jobs-list-materials/motor-service-jobs-list-materials.component';
import {ProductsModule} from '../products/products.module';

@NgModule({
  declarations: [
    MotorServiceJobsListComponent,
    MotorServiceJobsAddComponent,
    MotorServiceJobsEditComponent,
    MotorServiceJobsComponent,
    MotorServiceJobCategoryListComponent,
    MotorServiceJobsAddMaterialsComponent,
    MotorServiceJobsListMaterialsComponent,
  ],
  imports: [
    CommonModule,
    MotorServiceJobsRoutingModule,
    BookingsModule,
    MechanicsModule,
    ProductsModule,
    StoreModule.forFeature('motorServiceJobs', motorServiceJobsReducer),
    EffectsModule.forFeature([MotorServiceJobsEffects]),
    NbCardModule,
    Ng2SmartTableModule,
    NbSpinnerModule,
    ReactiveFormsModule,
    NbButtonModule,
    NbDatepickerModule,
    NbInputModule,
  ],
})
export class MotorServiceJobsModule {
}
