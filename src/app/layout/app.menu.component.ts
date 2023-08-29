import { Component, OnInit } from '@angular/core';
import { LANGUAGES, LanguageFlag, ROUTER } from '../shared';
import { TranslationService } from '../modules/i18n';
import { Router } from '@angular/router';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {
    model: any[] = [];
    language: LanguageFlag | undefined;
    langs = LANGUAGES;
    constructor(private _router: Router, private _translationService: TranslationService) {}
    ngOnInit() {
        this.initModel();
    }
    initModel() {
        const lang: string = this._translationService.getSelectedLanguage();
        if (lang === 'vn') {
            this.model = [
                {
                    label: 'Trang chủ',
                    icon: 'pi pi-home',
                    items: [
                        {
                            label: 'Cổng thông tin',
                            icon: 'pi pi-fw pi-home',
                            routerLink: [ROUTER.DASHBOARD],
                        },
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
                    items: [
                        {
                            label: 'Danh sách',
                            icon: 'pi pi-fw pi-list',
                            routerLink: [ROUTER.LIST_SERVICE],
                        },
                        {
                            label: 'Tạo',
                            icon: 'pi pi-plus',
                            routerLink: [ROUTER.CREATE_SERVICE],
                        },
                    ],
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
        } else if (lang === 'en') {
            this.model = [
                {
                    label: 'Home',
                    icon: 'pi pi-home',
                    items: [
                        {
                            label: 'Dasboard',
                            icon: 'pi pi-fw pi-home',
                            routerLink: [ROUTER.DASHBOARD],
                        },
                    ],
                },
                {
                    label: 'Management Employee',
                    icon: 'pi pi-wrench',
                    items: [
                        {
                            label: 'List',
                            icon: 'pi pi-fw pi-list',
                            routerLink: [ROUTER.LIST_EMPLOYEE],
                        },
                        {
                            label: 'Create',
                            icon: 'pi pi-plus',
                            routerLink: [ROUTER.CREATE_EMPLOYEE],
                        },
                    ],
                },
                {
                    label: 'Management WorkShift',
                    icon: 'pi pi-wrench',
                    items: [
                        {
                            label: 'List',
                            icon: 'pi pi-fw pi-list',
                            routerLink: [ROUTER.LIST_WORK_SHIFT],
                        },
                        {
                            label: 'Create',
                            icon: 'pi pi-plus',
                            routerLink: [ROUTER.CREATE_WORKSHIFT],
                        },
                    ],
                },
                {
                    label: 'Management Service ',
                    icon: 'pi pi-slack',
                    items: [
                        {
                            label: 'List',
                            icon: 'pi pi-fw pi-list',
                            routerLink: [ROUTER.LIST_SERVICE],
                        },
                        {
                            label: 'Create',
                            icon: 'pi pi-plus',
                            routerLink: [ROUTER.CREATE_SERVICE],
                        },
                    ],
                },
                {
                    label: 'Management Customer ',
                    icon: 'pi pi-users',
                    items: [
                        {
                            label: 'List',
                            icon: 'pi pi-list',
                            routerLink: [ROUTER.LIST_CUSTOMER],
                        },
                        {
                            label: 'Create',
                            icon: 'pi pi-plus',
                            routerLink: [ROUTER.CREATE_CUSTOMER],
                        },
                    ],
                },
                {
                    label: 'Manage booking',
                    icon: 'pi pi-book',
                    items: [
                        {
                            label: 'List',
                            icon: 'pi pi-list',
                            routerLink: [ROUTER.LIST_BOOKING],
                        },
                        {
                            label: 'Create',
                            icon: 'pi pi-plus',
                            routerLink: [ROUTER.CREATE_BOOKING],
                        },
                    ],
                },
                {
                    label: 'Management User',
                    icon: 'pi pi-user',
                    items: [],
                },
                {
                    label: 'Management Feedback',
                    icon: 'pi pi-envelope',
                    items: [],
                },
                {
                    label: 'Settings',
                    icon: 'pi pi-cog',
                    items: [],
                },
            ];
        }
    }
}
