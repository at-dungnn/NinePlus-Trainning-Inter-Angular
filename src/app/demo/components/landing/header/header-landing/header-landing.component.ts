import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    selector: 'app-header-landing',
    templateUrl: './header-landing.component.html',
    styleUrls: ['./header-landing.component.scss'],
})
export class HeaderLandingComponent {
    constructor(private layoutService: LayoutService) {}
    get colorScheme(): string {
        return this.layoutService.config.colorScheme;
    }

    get layoutTheme(): string {
        return this.layoutService.config.layoutTheme;
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
}