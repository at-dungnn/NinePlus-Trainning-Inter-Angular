import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TranslationService } from 'src/app/modules/manage-system/components/i18n';
import { AuthenticateService } from 'src/app/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { LANGUAGES, LanguageFlag, ROUTER } from 'src/app/shared';
import { Router } from '@angular/router';
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
        private _authenticateService: AuthenticateService
    ) {}

    ngOnInit(): void {
        this.setLanguage(this._translationService.getSelectedLanguage());
    }

    navigateProfile() {
        this._router.navigate([ROUTER.PROFILE]);
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
