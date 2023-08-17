import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: 'list',
      data: { breadcrumb: 'List' },
      loadChildren: () => import('./service-list/service-list.module').then((m) => m.ServiceListModule)
    },
    {
      path: 'create',
      data: { breadcrumb: 'Create' },
      loadChildren: () => import('./service-create/service-create.module').then((m) => m.ServiceCreateModule)
    },
    {
      path: 'edit/:id',
      data: { breadcrumb: 'Edit' },
      loadChildren: () => import('./service-edit/service-edit.module').then((m) => m.ServiceEditModule)
    }
  ])],
  exports: [RouterModule]
})
export class ServiceRoutingModule { }
