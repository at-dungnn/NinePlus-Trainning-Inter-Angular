import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './employee-list.component';
const routes: Routes = [];

@NgModule({
    imports: [RouterModule.forChild([{ path: '', component: EmployeeListComponent }])],
    exports: [RouterModule],
})
export class EmployeeListRoutingModule {}
