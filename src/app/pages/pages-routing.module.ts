import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {PagesComponent} from './pages.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'users',
      loadChildren: () => import('./users/users.module')
        .then(m => m.UsersModule),
    },
    {
      path: 'departments',
      loadChildren: () => import('./departments/departments.module')
        .then(m => m.DepartmentsModule),
    },
    {
      path: 'requisitions',
      loadChildren: () => import('./requisitions/requisitions.module')
        .then(m => m.RequisitionsModule),
    },
    {
      path: 'head-of-departments',
      loadChildren: () => import('./head-of-departments/head-of-departments.module')
        .then(m => m.HeadOfDepartmentsModule),
    },
    {
      path: 'motor-service-categories',
      loadChildren: () => import('./motor-service-categories/motor-service-categories.module')
        .then(m => m.MotorServiceCategoriesModule),
    },
    {
      path: 'motor-service-jobs', loadChildren: () => import('./motor-service-jobs/motor-service-jobs.module')
        .then(m => m.MotorServiceJobsModule),
    },
    {
      path: 'users',
      loadChildren: () => import('./users/users.module')
        .then(m => m.UsersModule),
    },
    {
      path: 'vehicles',
      loadChildren: () => import('./vehicles/vehicles.module')
        .then(m => m.VehiclesModule),
    },
    {
      path: 'products',
      loadChildren: () => import('./products/products.module')
        .then(m => m.ProductsModule),
    },
    {
      path: 'bookings',
      loadChildren: () => import('./bookings/bookings.module')
        .then(m => m.BookingsModule),
    }, {
      path: 'mechanics', loadChildren: () => import('./mechanics/mechanics.module')
        .then(m => m.MechanicsModule),
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
