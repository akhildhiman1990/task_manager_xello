import { createReducer, on } from '@ngrx/store';
import { TaskListDetails } from '../../shared/models';
import { createTaskAction, deleteTaskAction, editTaskAction, editTaskResponseAction } from '../actions';

export const appFeatureKey = 'App';

export interface AppState {
  taskList : TaskListDetails[];
  editTask: TaskListDetails;
}

export const initialState: AppState = {
  taskList: [],
  editTask: null!
};

export const reducer = createReducer(
  initialState,
  on(createTaskAction, (state, action) => ({
    ...state,
    taskList: state.taskList.concat(action.task),
  })),
  on(deleteTaskAction, (state, action) => {
    const taskList = state.taskList.filter((item: TaskListDetails) => {
      return item.id !== action.taskId;
    });

    return {
      ...state,
      taskList: taskList
    }
  }),
  on(editTaskAction, (state, action) => ({
    ...state,
    editTask: action.task,
  })),
  on(editTaskResponseAction, (state, action) => {
    const taskIdx = state.taskList.findIndex((item: TaskListDetails) => {
      return item.id === action.task.id;
    });
    const taskList = [...state.taskList];
    taskList[taskIdx] = action.task;

    return {
      ...state,
      taskList: taskList
    }
  }),
);

export const selectTaskList = (state: AppState) => state.taskList;
export const editTaskList = (state: AppState) => state.editTask;
