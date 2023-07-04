import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { ConfirmBoxComponent } from './confirm-box.component';

describe('ConfirmBoxComponent', () => {
  let component: ConfirmBoxComponent;
  let fixture: ComponentFixture<ConfirmBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ConfirmBoxComponent, MatDialogModule ],
      providers: [
        {provide: MatDialogRef, useValue: []}, 
        {provide: MAT_DIALOG_DATA, useValue: []}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
