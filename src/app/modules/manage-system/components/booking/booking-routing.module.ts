import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'list',
    data: { breadcrumb: 'List' },
    loadChildren: () =>
      import('./list/booking-list.module').then(
        (m) => m.BookingListModule
      )
  }, {
    path: 'create',
    data:  { breadcrumb: 'Add New Booking' },
    loadChildren: () =>
        import('./create/booking-create.module').then(
          (m) => m.BookingCreateModule
        ),
  },
  {
    path: 'edit',
    data: { breadcrumb: 'Edit' },
    loadChildren: () =>
      import('./edit/booking-edit.module').then(
        (m) => m.BookingEditModule
      ),
  },
  {
    path: 'detail',
    data: { breadcrumb: 'Details Booking' },
    loadChildren: () =>
      import('./detail/booking-detail.module').then(
        (m) => m.BookingDetailModule
      )
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingRoutingModule { }
