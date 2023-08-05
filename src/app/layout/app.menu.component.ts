import { Component, OnInit } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { ROUTER } from '../shared';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {
    model: any[] = [];

    constructor(public layoutService: LayoutService) {}

    ngOnInit() {
        this.model = [
            {
                label: 'Trang chủ',
                icon: 'pi pi-home',
                items: [
                    {
                        label: 'Cổng thông tin',
                        icon: 'pi pi-fw pi-home',
                        routerLink: [''],
                    }
                ],
            },
            {
                label: 'Quản lý nhân viên',
                icon: 'pi pi-wrench',
                items: [
                    {
                        label: 'Danh sách',
                        icon: 'pi pi-fw pi-list',
                        routerLink: [ROUTER.LIST_EMPLOYEE],
                    },
                    {
                        label: 'Tạo',
                        icon: 'pi pi-plus',
                        routerLink: [ROUTER.CREATE_EMPLOYEE],
                    },
                ],
            },
            {
                label: 'Quản lý ca làm việc',
                icon: 'pi pi-wrench',
                items: [
                    {
                        label: 'Danh sách',
                        icon: 'pi pi-fw pi-list',
                        routerLink: [ROUTER.LIST_WORK_SHIFT],
                    },
                    {
                        label: 'Tạo',
                        icon: 'pi pi-plus',
                        routerLink: [ROUTER.CREATE_WORKSHIFT],
                    },
                ],
            },
            {
                label: 'Quản lý dịch vụ',
                icon: 'pi pi-slack',
                items: [],
            },
            {
                label: 'Quản lý khách hàng',
                icon: 'pi pi-users',
                items: [
                    {
                        label: 'Danh sách',
                        icon: 'pi pi-list',
                        routerLink: [ROUTER.LIST_CUSTOMER],
                    },
                    {
                        label: 'Tạo',
                        icon: 'pi pi-plus',
                        routerLink: [ROUTER.CREATE_CUSTOMER],
                    },
                ],
            },
            {
                label: 'Dịch vụ',
                icon: 'pi pi-slack',
                items: [],
            },
            {
                label: 'Quản lý đặt lịch',
                icon: 'pi pi-book',
                items: [
                    {
                        label: 'Danh sách',
                        icon: 'pi pi-list',
                        routerLink: [ROUTER.LIST_BOOKING],
                    },
                    {
                        label: 'Tạo',
                        icon: 'pi pi-plus',
                        routerLink: [ROUTER.CREATE_BOOKING],
                    },
                ],
            },
            {
                label: 'Quản lý người dùng',
                icon: 'pi pi-user',
                items: [],
            },
            {
                label: 'Quảng lý feedback',
                icon: 'pi pi-envelope',
                items: [],
            },
            {
                label: 'Cài đặt',
                icon: 'pi pi-cog',
                items: [],
            },
        ];
    }
}
