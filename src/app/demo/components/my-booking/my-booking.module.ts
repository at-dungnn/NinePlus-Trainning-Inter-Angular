import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { AppConfigModule } from 'src/app/layout/config/config.module';
import { TranslateModule } from '@ngx-translate/core';
import { TooltipModule } from 'primeng/tooltip';
import { CalendarModule } from 'primeng/calendar';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { MyBookingRoutingModule } from './my-booking-routing.module';
import { MyBookingComponent } from './my-booking.component';
import { DividerModule } from 'primeng/divider';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@NgModule({
    declarations: [MyBookingComponent],
    imports: [
        CommonModule,
        MyBookingRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        ToastModule,
        InputTextModule,
        RippleModule,
        AppConfigModule,
        TranslateModule,
        TooltipModule,
        CalendarModule,
        MultiSelectModule,
        InputTextareaModule,
        DropdownModule,
        DividerModule,
        ConfirmDialogModule,
        AppConfigModule
    ],
})
export class MyBookingModule {}