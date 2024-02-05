import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {LocalDataSource} from 'ng2-smart-table';
import {MotorServiceJob} from '../motor-service-jobs.entity';
import {MotorServiceJobsService} from '../motor-service-jobs.service';
import {
  MotorServiceJobsAddMaterialsComponent,
} from '../motor-service-jobs-add-materials/motor-service-jobs-add-materials.component';
import {NbDialogService} from '@nebular/theme';
import {MotorServiceJobsEditComponent} from '../motor-service-jobs-edit/motor-service-jobs-edit.component';
import {Booking} from '../../bookings/bookings.entity';

@Component({
  selector: 'ngx-motor-service-jobs-list-materials',
  templateUrl: './motor-service-jobs-list-materials.component.html',
  styleUrls: ['./motor-service-jobs-list-materials.component.scss'],
})
export class MotorServiceJobsListMaterialsComponent implements OnInit {

  @Input() booking: Partial<Booking>;
  @Input() serviceTask: Partial<MotorServiceJob>;
  loader$: Observable<boolean>;
  source: LocalDataSource = new LocalDataSource();
  settings = {
    actions: false, columns: {
      name: {
        title: 'Product Name', type: 'string',
      }, description: {
        title: 'Product Description', type: 'string',
      }, quantity: {
        title: 'Quantity', type: 'number',
      },
    },
  };

  constructor(private motorServiceJobsService: MotorServiceJobsService, private dialogService: NbDialogService) {
  }

  ngOnInit(): void {
    this.motorServiceJobsService.getMaterials(this.serviceTask.id)
      .subscribe((data: any) => {
        const material = data.data.map(x => {
          return {
            name: x.product.name, description: x.product.description, quantity: x.quantity,
          };
        });
        this.source.load(material);
      }, error => {
        console.log('error', error);
      });
  }

  addMaterial() {
    console.log('this.serviceTask', this.serviceTask);
    this.dialogService.open(MotorServiceJobsAddMaterialsComponent, {
      context: {
        serviceTask: this.serviceTask,
      },
    });
  }

  editServiceJob() {
    this.dialogService.open(MotorServiceJobsEditComponent, {
      context: {
        serviceTask: this.serviceTask, booking: this.booking,
      },
    });
  }
}
