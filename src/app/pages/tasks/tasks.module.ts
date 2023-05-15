import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TasksRoutingModule} from './tasks-routing.module';
import {TasksListComponent} from './tasks-list/tasks-list.component';
import {TasksAddComponent} from './tasks-add/tasks-add.component';
import {TasksEditComponent} from './tasks-edit/tasks-edit.component';
import {NbCardModule, NbSpinnerModule} from '@nebular/theme';
import {ReactiveFormsModule} from '@angular/forms';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {taskReducer} from './tasks.reducer';
import {TaskEffects} from './tasks.effects';

@NgModule({
  declarations: [
    TasksListComponent,
    TasksAddComponent,
    TasksEditComponent,
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    NbCardModule,
    NbSpinnerModule,
    StoreModule.forFeature('tasks', taskReducer),
    EffectsModule.forFeature([TaskEffects]),
    ReactiveFormsModule,
  ],
})
export class TasksModule {
}
