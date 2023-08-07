import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingEditRoutingModule } from './booking-edit-routing.module';
import { BookingEditComponent } from './booking-edit.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SharedModule } from 'primeng/api';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { MultiSelectModule } from 'primeng/multiselect';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
    declarations: [BookingEditComponent],
    imports: [CommonModule, BookingEditRoutingModule, InputTextareaModule, SharedModule, FormsModule, ToastModule, ReactiveFormsModule, MultiSelectModule, InputTextModule, CalendarModule],
   
})
export class BookingEditModule {}
