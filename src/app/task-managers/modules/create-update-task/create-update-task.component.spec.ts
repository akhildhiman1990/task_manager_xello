import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { StoreModule } from '@ngrx/store';

import { CreateUpdateTaskComponent } from './create-update-task.component';
import { CreateUpdateTaskModule } from './create-update-task.module';
import { appFeatureKey, reducer } from '../../store/reducers';

describe('CreateUpdateTaskComponent', () => {
  let component: CreateUpdateTaskComponent;
  let fixture: ComponentFixture<CreateUpdateTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ CreateUpdateTaskModule, StoreModule.forRoot({}), StoreModule.forFeature(appFeatureKey, reducer), MatSnackBarModule, MatDatepickerModule,
        MatNativeDateModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUpdateTaskComponent);
    component = fixture.componentInstance;
    (component as any).taskCreationFormGroup = new FormGroup({
      name: new FormControl(),
      description: new FormControl(),
      assigneeEmail: new FormControl(),
      priority: new FormControl(),
      dueDate: new FormControl(),
      status: new FormControl(),
    })
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
