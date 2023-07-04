import { createAction, props } from '@ngrx/store';
import { TaskListDetails } from '../../shared/models';

export const createTaskAction = createAction(
  '[App] Create Task',
  props<{ task: TaskListDetails }>()
);

export const deleteTaskAction = createAction(
  '[App] Delete Task',
  props<{ taskId: string }>()
);

export const editTaskAction = createAction(
  '[App] Edit Task',
  props<{ task: TaskListDetails }>()
);

export const editTaskResponseAction = createAction(
  '[App] Edit Response Task',
  props<{ task: TaskListDetails }>()
);
