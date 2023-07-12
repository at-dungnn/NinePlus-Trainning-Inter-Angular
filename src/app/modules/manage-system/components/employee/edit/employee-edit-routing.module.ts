import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeEditComponent } from './employee-edit.component';

const routes: Routes = [];

@NgModule({
    imports: [RouterModule.forChild([{ path: '', component: EmployeeEditComponent }])],
    exports: [RouterModule],
})
export class EmployeeEditRoutingModule {}
