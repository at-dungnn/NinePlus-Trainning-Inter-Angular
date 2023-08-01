import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingDetailComponent } from './booking-detail.component';

const routes: Routes = [
  {
    path: ':id',
    component: BookingDetailComponent,
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingDetailRoutingModule { }
