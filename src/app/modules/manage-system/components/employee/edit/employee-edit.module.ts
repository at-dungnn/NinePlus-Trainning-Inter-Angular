import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeEditRoutingModule } from './employee-edit-routing.module';
import { EmployeeEditComponent } from './employee-edit.component';
import {TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { FileUploadModule } from 'primeng/fileupload';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    EmployeeEditComponent
  ],
  imports: [
    CommonModule,
    EmployeeEditRoutingModule,
    TableModule,
    ButtonModule,
    ToastModule,
    FileUploadModule,
    RippleModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    CalendarModule,
    FormsModule,
    ToggleButtonModule,
    ReactiveFormsModule
  ]
})
export class EmployeeEditModule { }
