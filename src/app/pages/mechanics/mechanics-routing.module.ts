import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MechanicComponent} from './mechanic.component';
import {MechanicListComponent} from './mechanic-list/mechanic-list.component';

const routes: Routes = [{
  path: '', component: MechanicComponent,
  children: [{
    path: '', component: MechanicListComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MechanicsRoutingModule { }
