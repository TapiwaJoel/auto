import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RequisitionsRoutingModule} from './requisitions-routing.module';
import {RequisitionsAddComponent} from './requisitions-add/requisitions-add.component';
import {RequisitionsEditComponent} from './requisitions-edit/requisitions-edit.component';
import {RequisitionsListComponent} from './requisitions-list/requisitions-list.component';
import {RequisitionsComponent} from './requisitions.component';
import {NbButtonModule, NbCardModule, NbSpinnerModule} from '@nebular/theme';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {requisitionReducer} from './requisitions.reducer';
import {RequisitionEffects} from './requisitions.effects';
import {ReactiveFormsModule} from '@angular/forms';
import { RequisitionsDetailsComponent } from './requisitions-details/requisitions-details.component';


@NgModule({
  declarations: [
    RequisitionsAddComponent,
    RequisitionsEditComponent,
    RequisitionsComponent,
    RequisitionsListComponent,
    RequisitionsDetailsComponent,
  ],
  imports: [
    CommonModule,
    RequisitionsRoutingModule,
    NbButtonModule,
    NbCardModule,
    StoreModule.forFeature('requisitions', requisitionReducer),
    EffectsModule.forFeature([RequisitionEffects]),
    Ng2SmartTableModule,
    NbSpinnerModule,
    ReactiveFormsModule,
  ],
})
export class RequisitionsModule {
}
