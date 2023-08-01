import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingCreateRoutingModule } from './booking-create-routing.module';
import { BookingCreateComponent } from './booking-create.component';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SharedModule } from 'src/app/shared';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';

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
    ],
})
export class BookingCreateModule {}
