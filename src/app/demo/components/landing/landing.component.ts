import { Component} from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    templateUrl: './landing.component.html'
})
export class LandingComponent {

    constructor(private layoutService: LayoutService) {}
    
    ngOnInit(): void {
        window.scroll(0, 0);
      }
    

     scrollTo(viewChild: HTMLElement) {
        viewChild.scrollIntoView({behavior: 'smooth'});
    }

    get backgroundStyle(): object {
        let path = 'assets/demo/images/landing/';
        let image = this.layoutService.config.colorScheme === 'dark' ? 'line-effect-dark.svg' : 'line-effect.svg'; 

        return {'background-image': 'url(' + path + image + ')'};
    }

    get colorScheme(): string {
        return this.layoutService.config.colorScheme;
    }

    get layoutTheme(): string {
        return this.layoutService.config.layoutTheme;
    }

    get logo(): string {
        const path = 'assets/layout/images/logo-';
        const logo = this.layoutTheme === 'primaryColor' ? 'light.png' : (this.colorScheme === 'light' ? 'dark.png' : 'light.png');
        return path + logo;
    }
}