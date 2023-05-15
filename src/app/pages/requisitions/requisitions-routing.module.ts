import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RequisitionsComponent} from './requisitions.component';
import {RequisitionsListComponent} from './requisitions-list/requisitions-list.component';

const routes: Routes = [{
  path: '',
  component: RequisitionsComponent,
  children: [
    {
      path: '',
      component: RequisitionsListComponent,
    }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequisitionsRoutingModule {
}
