import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkshiftDetailRoutingModule } from './workshift-detail-routing.module';
import { WorkshiftDetailComponent } from './workshift-detail.component';
import { SharedModule } from 'src/app/shared';
import { SkeletonModule } from 'primeng/skeleton';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [WorkshiftDetailComponent],
    imports: [CommonModule, WorkshiftDetailRoutingModule, SharedModule, SkeletonModule, CheckboxModule, ReactiveFormsModule, FormsModule],
})
export class WorkshiftDetailModule {}
