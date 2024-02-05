import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProductsRoutingModule} from './products-routing.module';
import {ProductEditComponent} from './product-edit/product-edit.component';
import {ProductListComponent} from './product-list/product-list.component';
import {ProductAddComponent} from './product-add/product-add.component';
import {ProductsComponent} from './products.component';
import {NbButtonModule, NbCardModule, NbSpinnerModule} from '@nebular/theme';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {ReactiveFormsModule} from '@angular/forms';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {productReducer} from './products.reducer';
import {ProductEffects} from './products.effects';
import {RequisitionsModule} from '../requisitions/requisitions.module';

@NgModule({
  declarations: [
    ProductEditComponent,
    ProductListComponent,
    ProductAddComponent,
    ProductsComponent,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    NbSpinnerModule,
    NbCardModule,
    Ng2SmartTableModule,
    RequisitionsModule,
    StoreModule.forFeature('products', productReducer),
    EffectsModule.forFeature([ProductEffects]),
    NbButtonModule,
    ReactiveFormsModule,
  ],
})
export class ProductsModule {
}
