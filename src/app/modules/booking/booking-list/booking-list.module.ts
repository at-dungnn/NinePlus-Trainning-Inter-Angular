import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingListRoutingModule } from './booking-list-routing.module';
import { BookingListComponent } from './booking-list.component';
import { SharedModule } from 'src/app/shared';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { SkeletonModule } from 'primeng/skeleton';
import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  declarations: [BookingListComponent],
  imports: [
    CommonModule,
    BookingListRoutingModule,
    SharedModule,
    ConfirmPopupModule,
    CalendarModule,
    FormsModule,
    SkeletonModule,
    ConfirmDialogModule,
    TooltipModule,
    TableModule,
    InputTextareaModule,
		InputTextModule
  ]
})
export class BookingListModule { }
