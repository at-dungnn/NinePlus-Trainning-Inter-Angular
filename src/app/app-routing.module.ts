import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppLayoutComponent } from './layout/app.layout.component';
import { AuthGuard } from './core';
import { ProfileLayoutComponent } from './demo/layout/profile-layout/profile-layout.component';
import { DefaultLayoutComponent } from './demo/layout/default-layout/default-layout.component';

const routes: Routes = [
    {
        path: '',
        component: DefaultLayoutComponent,
        children: [
            {
                path: 'landing',
                loadChildren: () => import('./demo/components/landing/landing.module').then((m) => m.LandingModule),
            },
            { path: '', redirectTo: 'landing', pathMatch: 'full' },
        ],
    },
    {
        path: '',
        component: AppLayoutComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'dashboard',
                loadChildren: () => import('./demo/components/dashboards/dashboards.module').then((m) => m.DashboardsModule),
            },
            {
                path: 'uikit',
                data: { breadcrumb: 'UI Kit' },
                loadChildren: () => import('./demo/components/uikit/uikit.module').then((m) => m.UIkitModule),
            },
            {
                path: 'utilities',
                data: { breadcrumb: 'Utilities' },
                loadChildren: () => import('./demo/components/utilities/utilities.module').then((m) => m.UtilitiesModule),
            },
            {
                path: 'pages',
                data: { breadcrumb: 'Pages' },
                loadChildren: () => import('./demo/components/pages/pages.module').then((m) => m.PagesModule),
            },
            {
                path: 'employee',
                data: { breadcrumb: 'Quản lý nhân viên' },
                loadChildren: () => import('./modules/employee/employee.module').then((m) => m.EmployeeModule),
            },
            {
                path: 'customer',
                data: { breadcrumb: 'Quản lý khách hàng' },
                loadChildren: () => import('./modules/customer/customer.module').then((m) => m.CustomerModule),
            },
            {
                path: 'work-shift',
                data: { breadcrumb: 'Quản lý ca làm việc' },
                loadChildren: () => import('./modules/work-shift/work-shift.module').then((m) => m.WorkShiftModule),
            },
            {
                path: 'service',
                data: { breadcrumb: 'Quản lý dịch vụ' },
                loadChildren: () => import('./modules/service/service.module').then((m) => m.ServiceModule),
            },
            {
                path: 'documentation',
                data: { breadcrumb: 'Tài liệu' },
                loadChildren: () => import('./demo/components/documentation/documentation.module').then((m) => m.DocumentationModule),
            },
            {
                path: 'blocks',
                data: { breadcrumb: 'Prime Blocks' },
                loadChildren: () => import('./demo/components/primeblocks/primeblocks.module').then((m) => m.PrimeBlocksModule),
            },
            {
                path: 'ecommerce',
                data: { breadcrumb: 'E-Commerce' },
                loadChildren: () => import('./demo/components/ecommerce/ecommerce.module').then((m) => m.EcommerceModule),
            },
            {
                path: 'apps',
                data: { breadcrumb: 'Apps' },
                loadChildren: () => import('./demo/components/apps/apps.module').then((m) => m.AppsModule),
            },
            {
                path: 'booking',
                data: { breadcrumb: 'Quản lý đặt lịch' },
                loadChildren: () => import('./modules/booking/booking.module').then((m) => m.BookingModule),
            },
        ],
    },

    {
        path: 'auth',
        data: { breadcrumb: 'Auth' },
        loadChildren: () => import('./demo/components/auth/auth.module').then((m) => m.AuthModule),
    },
    {
        path: 'account',
        component: ProfileLayoutComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                loadChildren: () => import('./demo/components/profile-customer/profile-customer.module').then((m) => m.ProfileCustomerModule),
            },
            {
                path: 'change-password',
                loadChildren: () => import('./demo/components/auth/changepassword/changepassword.module').then((m) => m.ChangePasswordModule),
            },
            {
                path: 'booking',
                loadChildren: () => import('./demo/components/client-booking/client-booking.module').then((m) => m.ClientBookingModule),
            },
            {
                path: 'my-booking',
                loadChildren: () => import('./demo/components/my-booking/my-booking.module').then((m) => m.MyBookingModule),
            },
            {
                path: 'edit-booking',
                loadChildren: () => import('./demo/components/edit-my-booking/edit-my-booking.module').then((m) => m.EditMyBookingModule),
            },  
        ],
    },
    {
        path: 'notfound',
        loadChildren: () => import('./demo/components/notfound/notfound.module').then((m) => m.NotfoundModule),
    },

    { path: '**', redirectTo: '/notfound' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
