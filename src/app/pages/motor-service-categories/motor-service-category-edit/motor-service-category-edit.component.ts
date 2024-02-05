import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../app-store/app-state';
import {selectMotorServiceCategoryLoading} from '../motor-service-categories.selectors';
import {editRequest} from '../motor-service-categories.actions';
import {MotorServiceCategory} from '../motor-service-categories.entity';

@Component({
  selector: 'ngx-service-garage-edit',
  templateUrl: './motor-service-category-edit.component.html',
  styleUrls: ['./motor-service-category-edit.component.scss'],
})
export class MotorServiceCategoryEditComponent implements OnInit {
  @Input() motorServiceCategory: Partial<MotorServiceCategory>;
  addMotorServiceCategoryForm: FormGroup;
  name;
  loader$: Observable<boolean>;
  roles: any[];
  statuses = ['ACTIVE', 'INACTIVE', 'DELETED'];

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {

    this.loader$ = this.store.pipe(select(selectMotorServiceCategoryLoading));

    this.addMotorServiceCategoryForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      recordStatus: new FormControl('', Validators.required),
    });

    this.addMotorServiceCategoryForm.setValue({
      name: this.motorServiceCategory.name,
      description: this.motorServiceCategory.description,
      recordStatus: this.motorServiceCategory.recordStatus,
    });
  }

  onSubmit() {
    this.store.dispatch(editRequest({
      motorServiceCategory:
        {...this.addMotorServiceCategoryForm.value, id: this.motorServiceCategory.id},
    }));
  }
}
