import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../app-store/app-state';
import {selectMotorServiceCategoryLoading} from '../motor-service-categories.selectors';
import {createServiceCategoryRequest} from '../motor-service-categories.actions';

@Component({
  selector: 'ngx-service-garage-add',
  templateUrl: './motor-service-category-add.component.html',
  styleUrls: ['./motor-service-category-add.component.scss'],
})
export class MotorServiceCategoryAddComponent implements OnInit {
  addMotorServiceCategoryForm: FormGroup;
  name;
  loader$: Observable<boolean>;
  roles: any[];

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {

    this.loader$ = this.store.pipe(select(selectMotorServiceCategoryLoading));

    this.addMotorServiceCategoryForm = new FormGroup({
      category: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    this.store.dispatch(createServiceCategoryRequest({
      motorServiceCategory:
        {...this.addMotorServiceCategoryForm.value},
    }));
  }
}
