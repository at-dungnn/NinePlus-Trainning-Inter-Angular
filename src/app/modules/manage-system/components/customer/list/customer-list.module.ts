import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerlistRoutingModule } from './customer-list-routing.module';
import { CustomerListComponent } from './customer-list.component';
import { SharedModule } from 'src/app/shared';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { SkeletonModule } from 'primeng/skeleton';


@NgModule({
  declarations: [CustomerListComponent],
  imports: [
    CommonModule,
    CustomerlistRoutingModule,
    SharedModule,
    ConfirmDialogModule,
    ConfirmPopupModule,
    CalendarModule,
    FormsModule,
    SkeletonModule
  ],
})
export class CustomerlistModule { }
