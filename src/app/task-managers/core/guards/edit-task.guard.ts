import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { AppState } from '../../store/reducers';
import { editTaskId } from '../../store/selectors';
import { TaskListDetails } from '../../shared/models';

@Injectable({
  providedIn: 'root'
})
export class EditTaskGuard implements CanActivate {
  constructor(private store: Store<AppState>, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.store.select(editTaskId).pipe(take(1)).subscribe((task: TaskListDetails) => {
        if (!task) {
          this.router.navigate(['/list']);
          return false;
        }
        return true;
      });

    return true;
  }
  
}
