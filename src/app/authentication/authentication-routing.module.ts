import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignInComponent} from './sign-in/sign-in.component';
import {BlankAuthComponent} from './blank-auth.component';

const routes: Routes = [{
  path: '',
  component: BlankAuthComponent,
  children: [{
    path: '',
    component: SignInComponent,
  }, {
    path: 'login',
    component: SignInComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticationRoutingModule {
}

