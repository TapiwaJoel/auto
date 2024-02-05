import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../app-store/app-state';
import {selectProductLoading} from '../products.selectors';
import {createProductRequest} from '../products.actions';
import {Currencies} from '../../utils/currencies';
import {loadRequisitionRequest} from '../../requisitions/requisitions.actions';
import {selectAllRequisitions} from '../../requisitions/requisitions.selectors';
import {Requisition} from '../../requisitions/requisitions.entity';

@Component({
  selector: 'ngx-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss'],
})
export class ProductAddComponent implements OnInit {

  addProductForm: FormGroup;
  loader$: Observable<boolean>;
  requisitions: Partial<Requisition> [] = [];

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {

    this.loader$ = this.store.pipe(select(selectProductLoading));
    this.loadRequisitions();

    this.addProductForm = new FormGroup({
      requisitionNumber: new FormControl('', Validators.required),
      stockCode: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      quantity: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    this.store.dispatch(createProductRequest({
      product:
        {...this.addProductForm.value},
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
