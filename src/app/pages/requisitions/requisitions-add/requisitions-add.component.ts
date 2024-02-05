import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../app-store/app-state';
import {selectRequisitionLoading} from '../requisitions.selectors';
import {createRequest} from '../requisitions.actions';


@Component({
  selector: 'ngx-requisitions-add',
  templateUrl: './requisitions-add.component.html',
  styleUrls: ['./requisitions-add.component.scss'],
})
export class RequisitionsAddComponent implements OnInit {

  addRequisitionForm: FormGroup;
  name;
  loader$: Observable<boolean>;
  roles: any[];

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {

    this.loader$ = this.store.pipe(select(selectRequisitionLoading));

    this.addRequisitionForm = new FormGroup({
      requisitionNumber: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    this.store.dispatch(createRequest({requisition: {...this.addRequisitionForm.value}}));
  }
}
