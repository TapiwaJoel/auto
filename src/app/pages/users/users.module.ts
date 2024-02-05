import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UsersRoutingModule} from './users-routing.module';
import {UserAddComponent} from './user-add/user-add.component';
import {UsersComponent} from './users.component';
import {NbButtonModule, NbCardModule, NbCheckboxModule, NbSpinnerModule, NbTabsetModule} from '@nebular/theme';
import {ReactiveFormsModule} from '@angular/forms';
import {UserListComponent} from './user-list/user-list.component';
import {UserEditComponent} from './user-edit/user-edit.component';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {userReducer} from './users.reducer';
import {UserEffects} from './users.effects';
import {DepartmentsModule} from '../departments/departments.module';
import {HeadOfDepartmentsModule} from '../head-of-departments/head-of-departments.module';
import {MechanicsModule} from '../mechanics/mechanics.module';

@NgModule({
  declarations: [
    UserAddComponent,
    UsersComponent,
    UserListComponent,
    UserEditComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    NbCardModule,
    ReactiveFormsModule,
    Ng2SmartTableModule,
    DepartmentsModule,
    HeadOfDepartmentsModule,
    MechanicsModule,
    StoreModule.forFeature('users', userReducer),
    EffectsModule.forFeature([UserEffects]),
    NbSpinnerModule,
    NbButtonModule,
    NbTabsetModule,
    NbCheckboxModule,
  ],
})
export class UsersModule {
}
