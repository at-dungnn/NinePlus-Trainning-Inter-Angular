import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TranslationService } from '../modules/manage-system/components/i18n';
import { LanguageFlag, LANGUAGES, ROUTER } from '../shared';
import { LayoutService } from './service/app.layout.service';
import { AuthenticateService } from '../core';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
})
export class AppTopBarComponent {
    menu: MenuItem[] = [];

    @ViewChild('searchinput') searchInput!: ElementRef;

    @ViewChild('menubutton') menuButton!: ElementRef;

    searchActive: boolean = false;
    language: LanguageFlag | undefined;
    langs = LANGUAGES;
    constructor(
        public layoutService: LayoutService,
        private _translationService: TranslationService,
        private _authenticateService: AuthenticateService,
    ) {}

    ngOnInit(): void {
        this.setLanguage(this._translationService.getSelectedLanguage());
    }
    onMenuButtonClick() {
        this.layoutService.onMenuToggle();
    }

    logout() {
        this._authenticateService.logOut();
    }

    activateSearch() {
        this.searchActive = true;
        setTimeout(() => {
            this.searchInput.nativeElement.focus();
        }, 100);
    }

    deactivateSearch() {
        this.searchActive = false;
    }

    removeTab(event: MouseEvent, item: MenuItem, index: number) {
        this.layoutService.onTabClose(item, index);
        event.preventDefault();
    }

    get layoutTheme(): string {
        return this.layoutService.config.layoutTheme;
    }

    get colorScheme(): string {
        return this.layoutService.config.colorScheme;
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

    get tabs(): MenuItem[] {
        return this.layoutService.tabs;
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
