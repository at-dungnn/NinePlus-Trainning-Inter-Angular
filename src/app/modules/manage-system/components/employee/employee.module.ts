import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeListComponent } from './list/employee-list.component';
import { EmployeeCreateComponent } from './create/employee-create.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
  ]
})
export class EmployeeModule { }
