import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'list',
        data: { breadcrumb: 'Danh sách' },
        loadChildren: () => import('./booking-list/booking-list.module').then((m) => m.BookingListModule),
    },
    {
        path: 'create',
        data: { breadcrumb: 'Thêm mới' },
        loadChildren: () => import('./booking-create/booking-create.module').then((m) => m.BookingCreateModule),
    },
    {
        path: 'edit',
        data: { breadcrumb: 'Chỉnh sửa ' },
        loadChildren: () => import('./booking-edit/booking-edit.module').then((m) => m.BookingEditModule),
    },
    {
        path: 'detail',
        data: { breadcrumb: 'Chi tiết' },
        loadChildren: () => import('./booking-detail/booking-detail.module').then((m) => m.BookingDetailModule),
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class BookingRoutingModule {}
