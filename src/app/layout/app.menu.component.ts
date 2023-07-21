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
                label: 'Dashboard',
                icon: 'pi pi-home',
                items: [],
            },
            {
                label: 'Employee',
                icon: 'pi pi-wrench',
                items: [],
            },
            {
                label: 'Service',
                icon: 'pi pi-slack',
                items: [],
            },
            {
                label: 'Customer',
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
                label: 'Booking',
                icon: 'pi pi-book',
                items: [],
            },
            {
                label: 'User',
                icon: 'pi pi-user',
                items: [],
            },
            {
                label: 'Feedback',
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
