import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditTaskGuard } from './task-managers/core/guards/edit-task.guard';

const routes: Routes = [
  {
    path: 'create',
    loadChildren: () => import('./task-managers/modules/create-update-task/create-update-task.module').then(m => m.CreateUpdateTaskModule),
  },
  {
    path: 'edit',
    loadChildren: () => import('./task-managers/modules/create-update-task/create-update-task.module').then(m => m.CreateUpdateTaskModule),
    canActivate: [EditTaskGuard]
  },
  {
    path: 'list',
    loadChildren: () => import('./task-managers/modules/task-list/task-list.module').then(m => m.TaskListModule),
  },
  {
    path: '**',
    redirectTo: 'list',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
