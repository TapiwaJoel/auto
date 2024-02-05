import {Component, Input, OnInit} from '@angular/core';
import {Requisition} from '../requisitions.entity';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../app-store/app-state';
import {selectRequisitionLoading} from '../requisitions.selectors';
import {editRequest} from '../requisitions.actions';

@Component({
  selector: 'ngx-requisitions-edit',
  templateUrl: './requisitions-edit.component.html',
  styleUrls: ['./requisitions-edit.component.scss'],
})
export class RequisitionsEditComponent implements OnInit {
  @Input() requisition: Partial<Requisition>;
  addRequisitionForm: FormGroup;
  name: any;
  loader$: Observable<boolean>;
  roles: any[];
  statuses = ['ACTIVE', 'INACTIVE', 'DELETED'];

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {

    this.loader$ = this.store.pipe(select(selectRequisitionLoading));

    this.addRequisitionForm = new FormGroup({
      description: new FormControl('', Validators.required),
      recordStatus: new FormControl('', Validators.required),
    });

    this.addRequisitionForm.setValue({
      description: this.requisition.description,
      recordStatus: this.requisition.recordStatus,
    });
  }

  onSubmit() {
    this.store.dispatch(editRequest({requisition: {...this.addRequisitionForm.value, id: this.requisition.id}}));
  }

}
