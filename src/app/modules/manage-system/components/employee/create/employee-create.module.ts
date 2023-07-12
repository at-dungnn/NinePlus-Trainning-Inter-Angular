import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeCreateRoutingModule } from './employee-create-routing.module';
import { EmployeeCreateComponent } from './employee-create.component';
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
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    EmployeeCreateComponent
  ],
  imports: [
    CommonModule,
    EmployeeCreateRoutingModule,
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
    ReactiveFormsModule
  ]
})
export class EmployeeCreateModule { }
