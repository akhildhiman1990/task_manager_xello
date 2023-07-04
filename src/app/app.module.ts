import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderModule } from './task-managers/components/header';
import { appFeatureKey, reducer } from './task-managers/store/reducers';
import { PriorityPipe } from './task-managers/shared/pipes/priority.pipe';

@NgModule({
  declarations: [
    AppComponent,
    PriorityPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({}, {}),
    StoreModule.forFeature(appFeatureKey, reducer),
    BrowserAnimationsModule,
    HeaderModule,
    MatSnackBarModule,
    MatNativeDateModule
  ],
  providers: [PriorityPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
