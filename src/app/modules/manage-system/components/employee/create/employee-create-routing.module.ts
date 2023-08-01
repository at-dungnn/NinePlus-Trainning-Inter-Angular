import { NgModule } from '@angular/core';
import { EmployeeCreateComponent } from './employee-create.component';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [];

@NgModule({
    imports: [RouterModule.forChild([{ path: '', component: EmployeeCreateComponent }])],
    exports: [RouterModule],
})
export class EmployeeCreateRoutingModule {}
