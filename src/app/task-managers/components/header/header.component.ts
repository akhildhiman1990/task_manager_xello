import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ConfirmBoxComponent } from '../../shared/components';
import { AppState } from '../../store/reducers';
import { editTaskAction } from '../../store/actions';

@Component({
  selector: 'tm-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  appName = 'Task Tracker';
  isCreateMode = false;

  constructor(private router: Router, public dialog: MatDialog, private store: Store<AppState>) {
    this.initSubscriptions();
  }

  addNewTask(): void {
    this.router.navigate(['/create']);
  }

  cancelTaskCreation(): void {
    const dialogRef = this.dialog.open(ConfirmBoxComponent, { data: {heading: 'Are you sure want to cancel?'}, disableClose: true });
    dialogRef.afterClosed().subscribe((val: boolean) => {
      if (val) {
        this.router.navigate(['/list']);
        this.store.dispatch(editTaskAction(null!));
      }
    });
  }

  private initSubscriptions(): void {
    const editUrls = ['/edit', '/create']
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.isCreateMode = editUrls.includes(val.url);
      }
    })
  }
}
