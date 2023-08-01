import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { isEmpty } from 'lodash';
import { MenuItem } from 'primeng/api';
import { ROUTER } from 'src/app/shared';
interface Toggle {
    toggle?: boolean;
}

@Component({
    selector: 'app-profile-sidebar',
    templateUrl: './profile-sidebar.component.html',
    styleUrls: ['./profile-sidebar.component.scss'],
})
export class ProfileSidebarComponent {
    menus: MenuItem[] = [];

    menuToggle: Toggle[] = [];

    constructor(private _router: Router) {}

    ngOnInit(): void {
        this.initMenu();
    }

    initMenu() {
        this.menus = [
            {
                icon: 'pi pi-cog',
                label: 'My Account',
                items: [
                    {
                        label: 'Profile',
                        routerLink: ROUTER.PROFILE,
                        visible: false,
                    },
                    {
                        label: 'Change Password',
                        routerLink: ROUTER.CHANGE_PASSWORD,
                        visible: false,
                    },
                ],
            },
            {
                icon: 'pi pi-book',
                label: 'My Booking',
                items: [],
            },
            {
                icon: 'pi pi-ticket',
                label: 'My Vouchers',
                items: [],
            },
        ];
        this.menus.forEach((menu) => {
            let item: Toggle = {
                toggle: false,
            };
            this.menuToggle.push(item);
        });
    }

    navigateAndToggleMenuItem(path: string, indexItem: number, indexMenuItem: number) {
        this.initMenu();
        if (!isEmpty(this.menus[indexItem].items)) {
            this.menus[indexItem].items = this.menus[indexItem].items?.map((item, index) => {
                if (index === indexMenuItem) {
                    item.visible = true;
                }
                return item;
            });
        }
        this._router.navigate([path]);
    }

    toggleMenuItem(menu: MenuItem, index: number) {
        if (menu?.items && menu.items.length > 0) {
            this.menuToggle[index].toggle = !this.menuToggle[index].toggle;
        }
    }
}
