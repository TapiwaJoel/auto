import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {Requisition} from '../../requisitions/requisitions.entity';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../app-store/app-state';
import {selectProductLoading} from '../products.selectors';
import {createProductRequest, editProductRequest} from '../products.actions';
import {loadRequisitionRequest} from '../../requisitions/requisitions.actions';
import {selectAllRequisitions} from '../../requisitions/requisitions.selectors';
import {MotorServiceCategory} from '../../motor-service-categories/motor-service-categories.entity';
import {Product} from '../products.entity';

@Component({
  selector: 'ngx-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss'],
})
export class ProductEditComponent implements OnInit {
  @Input() product: Partial<Product>;
  addProductForm: FormGroup;
  loader$: Observable<boolean>;
  requisitions: Partial<Requisition> [] = [];
  statuses = ['ACTIVE', 'INACTIVE', 'DELETED'];
  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.loader$ = this.store.pipe(select(selectProductLoading));
    this.loadRequisitions();

    this.addProductForm = new FormGroup({
      stockCode: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      quantity: new FormControl('', Validators.required),
      recordStatus: new FormControl('', Validators.required),
    });

    this.addProductForm.setValue({
      name: this.product.name,
      description: this.product.description,
      stockCode: this.product.stockCode,
      quantity: this.product.quantityAvailableInStock,
      recordStatus: this.product.recordStatus,
    });
  }

  onSubmit() {
    this.store.dispatch(editProductRequest({
      product:
        {...this.addProductForm.value, id: this.product.id},
    }));
  }

  loadRequisitions() {
    this.store.dispatch(loadRequisitionRequest());

    this.store.pipe(select(selectAllRequisitions))
      .subscribe({
        next: (data) => {
          this.requisitions = data;
        },
      });
  }

}
