import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServiceEditComponent } from './service-edit.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: '',
      component: ServiceEditComponent
    }
  ])],
  exports: [RouterModule]
})
export class ServiceEditRoutingModule { }
