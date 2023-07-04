import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskListRoutingModule } from './task-list-routing.module';
import { TaskListComponent } from './task-list.component';
import { ListViewModule } from '../../shared/components/list-view';


@NgModule({
  declarations: [
    TaskListComponent
  ],
  imports: [
    CommonModule,
    TaskListRoutingModule,
    ListViewModule
  ]
})
export class TaskListModule { }
