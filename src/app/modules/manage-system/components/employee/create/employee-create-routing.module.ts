import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeCreateComponent } from './employee-create.component';
const routes: Routes = [];

@NgModule({
    imports: [RouterModule.forChild([{ path: '', component: EmployeeCreateComponent }])],
    exports: [RouterModule],
})
export class EmployeeCreateRoutingModule {}
