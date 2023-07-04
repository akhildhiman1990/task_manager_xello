import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState, appFeatureKey, editTaskList, selectTaskList } from '../reducers';

const appSelector = createFeatureSelector<AppState>(appFeatureKey);

export const getTaskList = createSelector(appSelector, selectTaskList);
export const editTaskId = createSelector(appSelector, editTaskList);
