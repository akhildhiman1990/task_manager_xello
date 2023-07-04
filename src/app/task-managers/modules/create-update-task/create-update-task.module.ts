import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { CreateUpdateTaskRoutingModule } from './create-update-task-routing.module';
import { CreateUpdateTaskComponent } from './create-update-task.component';


@NgModule({
  declarations: [
    CreateUpdateTaskComponent
  ],
  imports: [
    CommonModule,
    CreateUpdateTaskRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatDatepickerModule   
  ]
})
export class CreateUpdateTaskModule { }
