import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Observable, map, startWith, take } from 'rxjs';

import { TaskPriority } from './models';
import { TaskListDetails } from '../../shared/models';
import { AppState } from '../../store/reducers';
import { createTaskAction, editTaskAction, editTaskResponseAction } from '../../store/actions';
import { generateUuid, getTaskStatus } from '../../shared/helpers';
import { editTaskId } from '../../store/selectors';

@Component({
  selector: 'tm-create-update-task',
  templateUrl: './create-update-task.component.html',
  styleUrls: ['./create-update-task.component.scss']
})
export class CreateUpdateTaskComponent {
  taskCreationFormGroup!: FormGroup;
  email = new FormControl('', [Validators.required]);
  isEditMode = false;
  taskId = generateUuid();
  taskPriorities: TaskPriority[] = [
    {id: 1, label: 'Lowest'},
    {id: 2, label: 'Low'},
    {id: 3, label: 'Medium'},
    {id: 4, label: 'High'}
  ];
  taskStatus: string[] = getTaskStatus();
  userEmailList: string[] = ['test@gmail.com', 'akhil@gmail.com', 'rohit@gmail.com', 'sonia@gmail.com'];
  filteredUserEmailList!: Observable<string[]>;

  constructor(private formBuilder: FormBuilder, private store: Store<AppState>, private router: Router, private snackBar: MatSnackBar) {
    this.store.select(editTaskId).pipe(take(1)).subscribe((task: TaskListDetails) => {
      this.isEditMode = !!task;
      if (!task) {
        this.initForm();
      } else {
        this.initEditForm(task);
      }
    });
  }

  submitTask(): void {
    if (this.taskCreationFormGroup.status === 'VALID') {
      const task: TaskListDetails = this.taskCreationFormGroup.value;
      task.id = this.taskId;
      if (this.isEditMode) {
        this.store.dispatch(editTaskResponseAction({task}));
        this.snackBar.open('Task Updated Successfully!!!', '', {duration: 1000});
        this.store.dispatch(editTaskAction(null!));
        this.isEditMode = false;
      } else {
        this.store.dispatch(createTaskAction({task}));
        this.snackBar.open('Task Created Successfully!!!', '', {duration: 1000});
      }
      this.router.navigate(['/list']);
      return;
    }
  }

  private initEditForm(task: TaskListDetails): void {
    this.taskId = task.id;
    this.taskCreationFormGroup = this.formBuilder.nonNullable.group({
      name: [task.name, [Validators.required]],
      description: [task.description, [Validators.required]],
      assigneeEmail: [task.assigneeEmail, [Validators.required, Validators.email]],
      priority: [task.priority, [Validators.required]],
      dueDate: [task.dueDate, [Validators.required]],
      status: [task.status, [Validators.required]]
    });
    this.setUserList();
  }

  private initForm(): void {
    this.taskCreationFormGroup = this.formBuilder.nonNullable.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      assigneeEmail: ['', [Validators.required, Validators.email]],
      priority: [1, [Validators.required]],
      dueDate: ['', [Validators.required]],
      status: [this.taskStatus[0], [Validators.required]]
    });
    this.setUserList();
  }

  private setUserList(): void {
    this.filteredUserEmailList = this.taskCreationFormGroup.controls['assigneeEmail'].valueChanges.pipe(
      startWith(''),
      map(value => this.filterUsersList(value || '')),
    );
  }

  private filterUsersList(value: string): string[] {
    return this.userEmailList.filter(street => street.includes(value));
  }
}
