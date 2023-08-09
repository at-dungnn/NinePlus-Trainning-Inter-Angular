import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthenticateService, SessionService } from 'src/app/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { LANGUAGES, LanguageFlag, ROUTER } from 'src/app/shared';
import { Router } from '@angular/router';
import { TranslationService } from 'src/app/modules/i18n';
import { ROLE } from 'src/app/shared/constants/role';
@Component({
    selector: 'app-topbar-profile',
    templateUrl: './topbar-profile.component.html',
    styleUrls: ['./topbar-profile.component.scss'],
})
export class TopbarProfileComponent {
    language: LanguageFlag | undefined;
    langs = LANGUAGES;

    constructor(
        public _layoutService: LayoutService,
        private _router: Router,
        private _translationService: TranslationService,
        private _authenticateService: AuthenticateService,
        private _sessionService: SessionService
    ) {}

    ngOnInit(): void {
        this.setLanguage(this._translationService.getSelectedLanguage());
    }

    navigateProfile() {
        if (this._sessionService.userAuthenticate.role === ROLE.CUSTOMER) {
            this._router.navigate([ROUTER.PROFILE]);
        }
    }

    logOut() {
        this._authenticateService.logOut();
        window.location.reload();
    }

    removeTab(event: MouseEvent, item: MenuItem, index: number) {
        this._layoutService.onTabClose(item, index);
        event.preventDefault();
    }

    selectLanguage(lang: string) {
        this._translationService.setLanguage(lang);
        this.setLanguage(lang);
        window.location.reload();
    }

    setLanguage(lang: string) {
        this.langs.forEach((language: LanguageFlag) => {
            if (language.lang === lang) {
                language.active = true;
                this.language = language;
            } else {
                language.active = false;
            }
        });
    }
}
