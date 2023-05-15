import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {VehiclesComponent} from './vehicles.component';
import {VehicleListComponent} from './vehicle-list/vehicle-list.component';

const routes: Routes = [{
  path: '',
  component: VehiclesComponent,
  children: [
    {
      path: '',
      component: VehicleListComponent,
    }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VehiclesRoutingModule {
}
