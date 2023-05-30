import {NgModule} from '@angular/core';

import {AuthenticationRoutingModule} from './authentication-routing.module';
import {SignInComponent} from './sign-in/sign-in.component';
import {AuthenticationComponent} from './authentication.component';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {authenticationReducer} from './authentication.reducer';
import {AuthenticationEffects} from './authentication.effects';
import {SignInModalComponent} from './sign-in-modal/sign-in-modal.component';
import {NbCardModule, NbDialogModule, NbLayoutModule, NbSpinnerModule} from '@nebular/theme';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {NbAuthModule} from '@nebular/auth';
import {BlankAuthComponent} from './blank-auth.component';
import {UsersModule} from '../pages/users/users.module';


const COMPONENTS = [
  SignInComponent,
  AuthenticationComponent,
  SignInModalComponent,
  BlankAuthComponent,
];

const ENTRY_COMPONENTS = [
  SignInModalComponent,
];

@NgModule({
  declarations: [
    ...COMPONENTS,
  ],

  entryComponents: [
    ...ENTRY_COMPONENTS,
  ],

  imports: [
    NbDialogModule.forChild(),
    StoreModule.forFeature('authentication', authenticationReducer),
    EffectsModule.forFeature([AuthenticationEffects]),
    AuthenticationRoutingModule,
    NbSpinnerModule,
    NbCardModule,
    ReactiveFormsModule,
    CommonModule,
    NbLayoutModule,
    UsersModule,
    NbAuthModule,
  ],
})

export class AuthenticationModule {
}
