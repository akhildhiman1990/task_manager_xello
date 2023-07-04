import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateUpdateTaskComponent } from './create-update-task.component';

const routes: Routes = [
  { path: '', component: CreateUpdateTaskComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateUpdateTaskRoutingModule { }
