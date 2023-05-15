import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DepartmentsRoutingModule} from './departments-routing.module';
import {DepartmentAddComponent} from './department-add/department-add.component';
import {DepartmentEditComponent} from './department-edit/department-edit.component';
import {DepartmentListComponent} from './department-list/department-list.component';
import {DepartmentsComponent} from './departments.component';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {departmentReducer} from './departments.reducer';
import {DepartmentEffects} from './departments.effects';
import {NbButtonModule, NbCardModule, NbSpinnerModule} from '@nebular/theme';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    DepartmentsComponent,
    DepartmentAddComponent,
    DepartmentEditComponent,
    DepartmentListComponent,
  ],
  imports: [
    CommonModule,
    DepartmentsRoutingModule,
    StoreModule.forFeature('departments', departmentReducer),
    EffectsModule.forFeature([DepartmentEffects]),
    NbCardModule,
    NbSpinnerModule,
    Ng2SmartTableModule,
    NbButtonModule,
    ReactiveFormsModule,
  ],
})
export class DepartmentsModule {
}
