import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingEditComponent } from './booking-edit.component';

const routes: Routes = [
  {
    path: ':id',
    component: BookingEditComponent
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingEditRoutingModule { }
