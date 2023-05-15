import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MechanicsRoutingModule} from './mechanics-routing.module';
import {MechanicListComponent} from './mechanic-list/mechanic-list.component';
import {MechanicEditComponent} from './mechanic-edit/mechanic-edit.component';
import {MechanicComponent} from './mechanic.component';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {mechanicReducer} from './mechanic.reducer';
import {MechanicEffects} from './mechanic.effects';

@NgModule({
  declarations: [
    MechanicListComponent,
    MechanicEditComponent,
    MechanicComponent,
  ],
  imports: [
    CommonModule,
    MechanicsRoutingModule,
    StoreModule.forFeature('mechanics', mechanicReducer),
    EffectsModule.forFeature([MechanicEffects]),
  ],
})
export class MechanicsModule {
}
