import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../app-store/app-state';
import {selectProductLoading} from '../products.selectors';
import {createProductRequest} from '../products.actions';
import {Currencies} from '../../utils/currencies';

@Component({
  selector: 'ngx-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss'],
})
export class ProductAddComponent implements OnInit {

  addProductForm: FormGroup;
  loader$: Observable<boolean>;
  currencies = Object.values(Currencies);

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {

    this.loader$ = this.store.pipe(select(selectProductLoading));

    this.addProductForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      quantityAvailableInStock: new FormControl('', Validators.required),
      code: new FormControl('', Validators.required),
      currency: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    console.log('...this.addProductForm.value', this.addProductForm.value);
    this.store.dispatch(createProductRequest({
      product:
        {...this.addProductForm.value},
    }));
  }
}
