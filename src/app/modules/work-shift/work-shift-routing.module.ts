import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [];

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'list',
                data: { breadcrumb: 'Danh sách' },
                loadChildren: () => import('./work-shift-list/work-shift-list.module').then((m) => m.WorkShiftListModule),
            },
            {
                path: 'detail/:id/:nameWorkshift',
                data: { breadcrumb: 'Chi tiết' },
                loadChildren: () => import('./work-shift-detail/workshift-detail.module').then((m) => m.WorkshiftDetailModule),
            },
            {
                path: 'edit/:id',
                data: { breadcrumb: 'Chỉnh sửa' },
                loadChildren: () => import('./work-shift-edit/workshift-edit.module').then((m) => m.WorkshiftEditModule),
            },
            {
                path: 'create',
                data: { breadcrumb: 'Thêm mới' },
                loadChildren: () => import('./work-shift-create/workshift-create.module').then((m) => m.WorkshiftCreateModule),
            },
        ]),
    ],
    exports: [RouterModule],
})
export class WorkShiftRoutingModule { }
