import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingCreateComponent } from './booking-create.component';

const routes: Routes = [
  {
    path: '',
    component: BookingCreateComponent,
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingCreateRoutingModule { }
