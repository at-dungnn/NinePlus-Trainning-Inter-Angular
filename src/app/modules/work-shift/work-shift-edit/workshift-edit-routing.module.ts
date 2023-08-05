import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkshiftEditComponent } from './workshift-edit.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([{
    path: '',
    component: WorkshiftEditComponent,
  }])],
  exports: [RouterModule]
})
export class WorkshiftEditRoutingModule { }
