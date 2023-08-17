import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [];

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'list',
                data: { breadcrumb: 'Danh sách' },
                loadChildren: () => import('./employee-list/employee-list.module').then((m) => m.EmployeeListModule),
            },
            {
                path: 'create',
                data: { breadcrumb: 'Tạo mới' },
                loadChildren: () => import('./employee-create/employee-create.module').then((m) => m.EmployeeCreateModule),
            },
            {
                path: 'edit/:id',
                data: { breadcrumb: 'Chỉnh sửa' },
                loadChildren: () => import('./employee-edit/employee-edit.module').then((m) => m.EmployeeEditModule),
            },
            {
                path: '**',
                redirectTo: '/notfound',
            },
        ]),
    ],
    exports: [RouterModule],
})
export class EmployeeRoutingModule { }
