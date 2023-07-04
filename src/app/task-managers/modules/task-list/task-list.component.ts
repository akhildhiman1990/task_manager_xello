import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { AppState } from '../../store/reducers';
import { getTaskList } from '../../store/selectors';
import { ListViewDDChange, ListViewHeaders, ListViewItems, TaskListDetails } from '../../shared/models';
import { PriorityPipe } from '../../shared/pipes/priority.pipe';
import { deleteTaskAction, editTaskAction, editTaskResponseAction } from '../../store/actions';
import { ConfirmBoxComponent } from '../../shared/components';
import { getTaskStatus } from '../../shared/helpers';

@Component({
  selector: 'tm-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnDestroy {
  taskList: ListViewItems[] = [];
  listHeaders: ListViewHeaders[]= [
    {key: 'name', label: 'Name', type: 'string'},
    {key: 'description', label: 'Description', type: 'string'},
    {key: 'assigneeEmail', label: 'Email', type: 'string'},
    {key: 'dueDate', label: 'Due Date', type: 'date'},
    {key: 'status', label: 'Task Status', type: 'dropdown'},
    {key: 'priorityType', label: 'Priority', type: 'string'},
  ];
  taskStatus: string[] = getTaskStatus();

  private taskListSubscription!: Subscription;

  constructor(private store: Store<AppState>, private priorityPipe: PriorityPipe, public dialog: MatDialog, private router: Router, private snackBar: MatSnackBar) {
    this.initSubscriptions();
  }

  ngOnDestroy(): void {
    this.taskListSubscription.unsubscribe();
  }

  onEditItem(item: ListViewItems): void {
    this.store.dispatch(editTaskAction({task: item}));
    this.router.navigate(['/edit']);
  }

  onChangeDDProperty(data: ListViewDDChange): void {
    const task = data.value;
    task.status = data.key;
    this.store.dispatch(editTaskResponseAction({task}));
    this.snackBar.open('Status Updated Successfully!!!', '', {duration: 1000});
  }

  onDeleteItem(item: ListViewItems): void {
    const dialogRef = this.dialog.open(ConfirmBoxComponent, { data: {heading: 'Are you sure want to delete?'}, disableClose: true });
    dialogRef.afterClosed().subscribe((val: boolean) => {
      if (val) {
        this.store.dispatch(deleteTaskAction({taskId: item.id}));
      }
    });
  }

  private initSubscriptions(): void {
    this.taskListSubscription = this.store.select(getTaskList).subscribe((list: TaskListDetails[]) => {
      this.taskList = list.map((item: TaskListDetails) => {
        return {
          id: item.id,
          name: item.name,
          description: item.description,
          assigneeEmail: item.assigneeEmail,
          priority: item.priority,
          dueDate: item.dueDate,
          priorityType: this.priorityPipe.transform(item.priority),
          status: item.status
        }
      });
    });
  }
}
