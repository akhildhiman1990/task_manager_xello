import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';

import { EditTaskGuard } from './edit-task.guard';

describe('EditTaskGuard', () => {
  let guard: EditTaskGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})]
    });
    guard = TestBed.inject(EditTaskGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
