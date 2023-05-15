import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MotorServiceCategoriesComponent} from './motor-service-categories.component';
import {MotorServiceCategoryListComponent} from './motor-service-category-list/motor-service-category-list.component';

const routes: Routes = [{
  path: '',
  component: MotorServiceCategoriesComponent,
  children: [
    {
      path: '',
      component: MotorServiceCategoryListComponent,
    }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MotorServiceCategoriesRoutingModule {
}
