import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkShiftListRoutingModule } from './work-shift-list-routing.module';
import { SharedModule } from 'src/app/shared';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { WorkShiftListComponent } from './work-shift-list.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
    declarations: [WorkShiftListComponent],
    imports: [
        CommonModule,
        WorkShiftListRoutingModule,
        SharedModule,
        SkeletonModule,
        TableModule,
        FormsModule,
        RadioButtonModule,
        ReactiveFormsModule,
    ],
})
export class WorkShiftListModule {}
