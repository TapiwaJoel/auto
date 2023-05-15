import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HeadOfDepartmentsComponent} from './head-of-departments.component';
import {HeadOfDepartmentListComponent} from './head-of-department-list/head-of-department-list.component';

const routes: Routes = [{
  path: '',
  component: HeadOfDepartmentsComponent,
  children: [
    {
      path: '',
      component: HeadOfDepartmentListComponent,
    }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HeadOfDepartmentsRoutingModule { }
