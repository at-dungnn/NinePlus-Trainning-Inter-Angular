import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkshiftCreateRoutingModule } from './workshift-create-routing.module';
import { WorkshiftCreateComponent } from './workshift-create.component';
import { SharedModule } from 'src/app/shared';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';


@NgModule({
  declarations: [WorkshiftCreateComponent],
  imports: [
    CommonModule,
    WorkshiftCreateRoutingModule,
    SharedModule,
    ButtonModule,
    CalendarModule
  ]
})
export class WorkshiftCreateModule { }
