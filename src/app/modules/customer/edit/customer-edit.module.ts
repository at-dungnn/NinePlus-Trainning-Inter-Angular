import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SharedModule } from 'src/app/shared';
import { CustomerEditComponent } from './customer-edit.component';
import { CustomerEditRoutingModule } from './customer-edit-routing.module';
import { InputNumberModule } from 'primeng/inputnumber';

@NgModule({
    declarations: [CustomerEditComponent],
    imports: [
        CommonModule,
        CustomerEditRoutingModule,
        CalendarModule,
        InputTextareaModule,
        SharedModule,
        InputNumberModule,
    ],
})
export class CustomerEditModule {}