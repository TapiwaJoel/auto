import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HeadOfDepartmentsRoutingModule} from './head-of-departments-routing.module';
import {HeadOfDepartmentListComponent} from './head-of-department-list/head-of-department-list.component';
import {HeadOfDepartmentAddComponent} from './head-of-department-add/head-of-department-add.component';
import {HeadOfDepartmentEditComponent} from './head-of-department-edit/head-of-department-edit.component';
import {HeadOfDepartmentsComponent} from './head-of-departments.component';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {headOfDepartmentReducer} from './head-of-departments.reducer';
import {HeadOfDepartmentsEffects} from './head-of-departments.effects';
import {NbButtonModule, NbCardModule, NbSpinnerModule} from '@nebular/theme';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {ReactiveFormsModule} from '@angular/forms';
import {DepartmentsModule} from '../departments/departments.module';

@NgModule({
  declarations: [
    HeadOfDepartmentListComponent,
    HeadOfDepartmentAddComponent,
    HeadOfDepartmentEditComponent,
    HeadOfDepartmentsComponent,
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('head-of-departments', headOfDepartmentReducer),
    EffectsModule.forFeature([HeadOfDepartmentsEffects]),
    HeadOfDepartmentsRoutingModule,
    NbCardModule,
    NbButtonModule,
    DepartmentsModule,
    Ng2SmartTableModule,
    NbSpinnerModule,
    ReactiveFormsModule,
  ],
})
export class HeadOfDepartmentsModule {
}
