import { Component } from '@angular/core';
import { isEmpty, isNil } from 'lodash';
import { SessionService } from 'src/app/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    selector: 'app-header-landing',
    templateUrl: './header-landing.component.html',
    styleUrls: ['./header-landing.component.scss'],
})
export class HeaderLandingComponent {
    isPopupLogin = false;

    isAuth = false;

    constructor(
        private _layoutService: LayoutService,
        private _sessionService: SessionService
    ) {}
    ngOnInit(): void {
        this.getRole();
    }

    getRole() {
        document.body.style['overflowY'] = 'unset';
        if (
            !isNil(this._sessionService.userInformation) &&
            !isEmpty(this._sessionService.userInformation)
        ) {
            this.isAuth = true;
        } else {
            setTimeout(() => {
                this.showPopupLogin();
            }, 5000);
        }
    }

    get colorScheme(): string {
        return this._layoutService.config.colorScheme;
    }

    get layoutTheme(): string {
        return this._layoutService.config.layoutTheme;
    }

    get logo(): string {
        const path = 'assets/layout/images/logo-';
        const logo =
            this.layoutTheme === 'primaryColor'
                ? 'light.png'
                : this.colorScheme === 'light'
                ? 'dark.png'
                : 'light.png';
        return path + logo;
    }

    hidePopupLogin() {
        this.isPopupLogin = false;
        document.body.style['overflowY'] = 'unset';
    }

    showPopupLogin() {
        this.isPopupLogin = true;
        document.body.style['overflowY'] = 'hidden';
    }
}
