import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MotorServiceJobsComponent} from './motor-service-jobs.component';
import {MotorServiceJobsListComponent} from './motor-service-jobs-list/motor-service-jobs-list.component';

const routes: Routes = [{
  path: '', component: MotorServiceJobsComponent,
  children: [{
    path: '', component: MotorServiceJobsListComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MotorServiceJobsRoutingModule {
}
