import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { isEmpty, isNil } from 'lodash';
import { AuthenticateService, SessionService } from 'src/app/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { ROUTER, TYPE } from 'src/app/shared';
import { listNavbar } from 'src/app/shared/constants/list-navbar';
import { ROLE } from 'src/app/shared/constants/role';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
    isPopupLogin = false;

    isAuth = false;

    isShowListCategoryMobiletTablet = false;

    listNavbarHeader = listNavbar;

    role = '';

    constructor(
        private _layoutService: LayoutService,
        private _sessionService: SessionService,
        private _authenticateService: AuthenticateService,
        private _router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.getRole();
        this.checkEventHiddenPopupLogin();
    }

    getRole() {
        if (!isNil(this._sessionService.userInformation) && !isEmpty(this._sessionService.userInformation)) {
            this.isAuth = true;
            this.role = this._sessionService.userAuthenticate.role;
        }
    }

    checkEventHiddenPopupLogin() {
        this.route.queryParams.subscribe((params) => {
            const type = params['type'];
            if (type === TYPE.LOGIN && !this.role) {
                this.showPopupLogin();
            }
        });
    }

    get colorScheme(): string {
        return this._layoutService.config.colorScheme;
    }

    get layoutTheme(): string {
        return this._layoutService.config.layoutTheme;
    }

    get logo(): string {
        const path = 'assets/layout/images/logo-';
        const logo = this.layoutTheme === 'primaryColor' ? 'light.png' : this.colorScheme === 'light' ? 'dark.png' : 'light.png';
        return path + logo;
    }

    hidePopupLogin() {
        this.isPopupLogin = false;
    }

    showPopupLogin() {
        this.isPopupLogin = true;
    }

    showListCategory() {
        this.isShowListCategoryMobiletTablet = true;
    }
    hiddenListCategory() {
        this.isShowListCategoryMobiletTablet = false;
    }

    navigateToRegister() {
        this._router.navigate([ROUTER.SIGNUP]);
    }
    navigateToBooking() {
        if (this.isAuth === false) {
            this.showPopupLogin();
        } else if (this.isAuth && this.role === ROLE.CUSTOMER) {
            this._router.navigate([ROUTER.CLIENT_BOOKING]);
        }
    }
}
