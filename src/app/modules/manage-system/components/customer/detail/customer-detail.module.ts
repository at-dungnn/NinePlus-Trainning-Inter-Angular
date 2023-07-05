import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerDetailRoutingModule } from './customer-detail-routing.module';
import { SharedModule } from 'src/app/shared';
import { CustomerDetailComponent } from './customer-detail.component';
import { FormsModule } from '@angular/forms';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { SkeletonModule } from 'primeng/skeleton';
import { HistorybookingComponent } from './historybooking/historybooking.component';


@NgModule({
  declarations: [CustomerDetailComponent, HistorybookingComponent],
  imports: [
    CommonModule,
    CustomerDetailRoutingModule,
    SharedModule,
    FormsModule,
    DynamicDialogModule,
    SkeletonModule,
  ]
})
export class CustomerDetailModule { }
