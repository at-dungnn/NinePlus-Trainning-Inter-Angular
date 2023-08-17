import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceListRoutingModule } from './service-list-routing.module';
import { ServiceListComponent } from './service-list.component';
import { SharedModule } from 'src/app/shared';
import { SkeletonModule } from 'primeng/skeleton';
import { RatingModule } from 'primeng/rating';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ServiceListComponent],
  imports: [
    CommonModule,
    ServiceListRoutingModule,
    SharedModule,
    SkeletonModule,
    RatingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ServiceListModule { }
