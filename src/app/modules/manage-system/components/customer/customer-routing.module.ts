import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  {
    path: 'list',
    data: { breadcrumb: 'List' },
    loadChildren: () =>
      import('./list/customer-list.module').then(
        (m) => m.CustomerlistModule
      ),
  },
  {
    path: 'edit',
    data: { breadcrumb: 'Edit' },
    loadChildren: () =>
      import('./edit/customer-edit.module').then(
        (m) => m.CustomerEditModule
      ),
  },
  {
    path: 'create',
    data: { breadcrumb: 'Add New' },
    loadChildren: () =>
      import('./create/customer-create.module').then(
        (m) => m.CustomerCreateModule
      ),
  },
  {
    path: 'detail',
    data: { breadcrumb: 'Details Customer Profile' },
    loadChildren: () =>
      import('./detail/customer-detail.module').then(
        (m) => m.CustomerDetailModule
      )
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
