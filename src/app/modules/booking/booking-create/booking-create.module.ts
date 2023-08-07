import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingCreateRoutingModule } from './booking-create-routing.module';
import { BookingCreateComponent } from './booking-create.component';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SharedModule } from 'src/app/shared';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';

@NgModule({
    declarations: [BookingCreateComponent],
    imports: [
        CommonModule,
        BookingCreateRoutingModule,
        CalendarModule,
        InputTextareaModule,
        SharedModule,
        InputNumberModule,
        FormsModule,
        MultiSelectModule
    ],
})
export class BookingCreateModule {}
