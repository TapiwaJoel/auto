import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MotorServiceCategoriesRoutingModule} from './motor-service-categories-routing.module';
import {MotorServiceCategoryAddComponent} from './motor-service-category-add/motor-service-category-add.component';
import {MotorServiceCategoryEditComponent} from './motor-service-category-edit/motor-service-category-edit.component';
import {MotorServiceCategoryListComponent} from './motor-service-category-list/motor-service-category-list.component';
import {MotorServiceCategoriesComponent} from './motor-service-categories.component';
import {NbButtonModule, NbCardModule, NbSpinnerModule} from '@nebular/theme';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {ReactiveFormsModule} from '@angular/forms';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {motorServiceCategoryReducer} from './motor-service-categories.reducer';
import {MotorServiceCategoryEffects} from './motor-service-categories.effects';

@NgModule({
  declarations: [
    MotorServiceCategoryAddComponent,
    MotorServiceCategoryEditComponent,
    MotorServiceCategoryListComponent,
    MotorServiceCategoriesComponent,
  ],
  imports: [
    CommonModule,
    MotorServiceCategoriesRoutingModule,
    NbCardModule,
    NbSpinnerModule,
    StoreModule.forFeature('motor-service-categories', motorServiceCategoryReducer),
    EffectsModule.forFeature([MotorServiceCategoryEffects]),
    NbButtonModule,
    Ng2SmartTableModule,
    ReactiveFormsModule,
  ],
})
export class MotorServiceCategoriesModule {
}
