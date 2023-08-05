import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkshiftCreateComponent } from './workshift-create.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([{
    path: '',
    component: WorkshiftCreateComponent,
  }])],
  exports: [RouterModule]
})
export class WorkshiftCreateRoutingModule { }
