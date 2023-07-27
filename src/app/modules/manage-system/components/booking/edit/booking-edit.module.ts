import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingEditRoutingModule } from './booking-edit-routing.module';
import { BookingEditComponent } from './booking-edit.component';


@NgModule({
  declarations: [
    BookingEditComponent
  ],
  imports: [
    CommonModule,
    BookingEditRoutingModule
  ]
})
export class BookingEditModule { }
