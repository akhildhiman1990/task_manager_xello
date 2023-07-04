import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';

import { TaskListComponent } from './task-list.component';
import { PriorityPipe } from '../../shared/pipes/priority.pipe';
import { appFeatureKey, reducer } from '../../store/reducers';
import { TestUtil } from '../../../../tests';
import { ListViewItems } from '../../shared/models';
import { editTaskAction, editTaskResponseAction } from '../../store/actions';
import { TaskListModule } from './task-list.module';
import { getTaskList } from '../../store';

class RouterStub {
  url = '';
  navigate(commands: any[], extras?: any) { }
}

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  const date = new Date();
  const task: ListViewItems = {
    id: 'abc',
    name: 'Test 1',
    description: 'Test Description',
    assigneeEmail: 'test@gmail.com',
    dueDate: date,
    status: 'Open',
    priority: 1,
    priorityType: 'Low'
  };

  beforeEach(async () => {
    console.warn = jest.fn();
    await TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({}), StoreModule.forFeature(appFeatureKey, reducer), MatDialogModule, MatSnackBarModule, NoopAnimationsModule, TaskListModule],
      providers: [
        PriorityPipe,
        {provide: MatDialogRef, useValue: []}, 
        {provide: MAT_DIALOG_DATA, useValue: []},
        { provide: Router, useClass: RouterStub },
        provideMockStore({
          selectors: [
            {
              selector: getTaskList,
              value: [task]
            }
          ]
        }),
      ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    component.taskList = [task];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check init values', () => {
    expect(component.taskList.length).toBe(1);
    expect(component.listHeaders.length).toBe(6);
    expect(component.taskStatus.length).toBe(4);
    expect(TestUtil.getPrivatePropertyValue(component, 'taskListSubscription')).toBeDefined();
  });

  describe('ngOnDestroy', () => {
    beforeEach(() => {
      (component as any).taskListSubscription.unsubscribe = jest.fn().mockReturnThis();
      jest.spyOn((component as any).taskListSubscription, 'unsubscribe');
    });

    it('should unsubscribe the listener', () => {
      component.ngOnDestroy();
      expect((component as any).taskListSubscription.unsubscribe).toHaveBeenCalled(); 
    })
  });

  describe('onEditItem', () => {
    beforeEach(() => {
      jest.spyOn((component as any).store, 'dispatch');
      jest.spyOn((component as any).router, 'navigate')
    });
    it('should emit event for edit item', () => {
      const task: ListViewItems = {
        id: 'abc',
        name: 'Test 1',
        description: 'Test Description',
        assigneeEmail: 'test@gmail.com',
        dueDate: new Date(),
        status: 'Open',
        priority: 1,
        priorityType: 'Low'
      }
      component.onEditItem(task);
      expect((component as any).store.dispatch).toHaveBeenCalledWith(editTaskAction({task}));
      expect((component as any).router.navigate).toHaveBeenCalledWith(['/edit']);
    });
  });

  describe('onChangeDDProperty', () => {
    beforeEach(() => {
      jest.spyOn((component as any).store, 'dispatch');
      jest.spyOn((component as any).snackBar, 'open');
    })

    it('should change status value', () => {
      const key = 'Review';
      const updatedTask: ListViewItems = {
        id: 'abc',
        name: 'Test 1',
        description: 'Test Description',
        assigneeEmail: 'test@gmail.com',
        dueDate: date,
        status: 'Review',
        priority: 1,
        priorityType: 'Low'
      };
      component.onChangeDDProperty({key: key, value: task});
      expect((component as any).store.dispatch).toHaveBeenCalledWith(editTaskResponseAction({task: updatedTask}));
      expect((component as any).taskList[0].status).toBe('Review');
      expect((component as any).snackBar.open).toHaveBeenCalledWith('Status Updated Successfully!!!', '', {duration: 1000});
    });
  });

  describe('onDeleteItem', () => {
    beforeEach(() => {
      jest.spyOn((component as any).dialog, 'open');
    })

    it('should open dailog', () => {
      const task: ListViewItems = {
        id: 'abc',
        name: 'Test 1',
        description: 'Test Description',
        assigneeEmail: 'test@gmail.com',
        dueDate: new Date(),
        status: 'Review',
        priority: 1,
        priorityType: 'Low'
      };
      component.onDeleteItem(task);
      expect((component as any).dialog.open).toHaveBeenCalled();
    })
  });
});
