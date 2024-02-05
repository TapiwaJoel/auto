import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {loadProductRequest} from '../../products/products.actions';
import {select, Store} from '@ngrx/store';
import {selectAllProducts} from '../../products/products.selectors';
import {AppState} from '../../app-store/app-state';
import {Product} from '../../products/products.entity';
import {MotorServiceJob} from '../motor-service-jobs.entity';
import {MotorServiceJobsService} from '../motor-service-jobs.service';

@Component({
  selector: 'ngx-motor-service-jobs-add-materials',
  templateUrl: './motor-service-jobs-add-materials.component.html',
  styleUrls: ['./motor-service-jobs-add-materials.component.scss'],
})
export class MotorServiceJobsAddMaterialsComponent implements OnInit {
  @Input() serviceTask: Partial<MotorServiceJob>;
  addProductForm: FormGroup;
  products: Partial<Product>[] = [];

  constructor(private store: Store<AppState>, private motorServiceJobsService: MotorServiceJobsService) {
  }

  ngOnInit(): void {
    this.store.dispatch(loadProductRequest());
    this.store.pipe(select(selectAllProducts))
      .subscribe({
        next: (data) => {
          this.products = data;
        },
      });

    this.addProductForm = new FormGroup({
      productId: new FormControl('', Validators.required), quantity: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    const material = {
      productId: parseInt(this.addProductForm.value.productId, 0),
      taskId: this.serviceTask.id,
      quantity: this.addProductForm.value.quantity,
    };

    this.motorServiceJobsService.postMaterials(material)
      .subscribe((data: any) => {

        const materialObject = {
          name: data.data.product.name, description: data.data.product.description, quantity: data.data.quantity,
        };

        this.motorServiceJobsService.products.push(materialObject);
        this.motorServiceJobsService.productBehavioral.next(this.motorServiceJobsService.products);

        console.log('task materials', materialObject);
      }, error => {
        console.log('error', error);
      });

    console.log('addProductForm', material);
  }
}
