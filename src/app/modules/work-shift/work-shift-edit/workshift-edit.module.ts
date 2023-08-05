import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkshiftEditRoutingModule } from './workshift-edit-routing.module';
import { SharedModule } from 'src/app/shared';
import { WorkshiftEditComponent } from './workshift-edit.component';
import { SkeletonModule } from 'primeng/skeleton';
import { CalendarModule } from 'primeng/calendar';


@NgModule({
  declarations: [WorkshiftEditComponent],
  imports: [
    CommonModule,
    WorkshiftEditRoutingModule,
    SharedModule,
    SkeletonModule,
    CalendarModule
  ]
})
export class WorkshiftEditModule { }
