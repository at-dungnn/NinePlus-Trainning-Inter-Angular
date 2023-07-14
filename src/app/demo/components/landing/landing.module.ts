import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing.component';
import { ButtonModule } from 'primeng/button';
import { Router, RouterModule } from '@angular/router';
import { StyleClassModule } from 'primeng/styleclass';
import { RippleModule } from 'primeng/ripple';
import { AppConfigModule } from 'src/app/layout/config/config.module';
import { HeaderLandingComponent } from './header/header-landing/header-landing.component';
import { FooterLandingComponent } from './footer/footer-landing/footer-landing.component';
import { BodyLandingComponent } from './body/body-landing/body-landing.component';

@NgModule({
    imports: [
        CommonModule,
        LandingRoutingModule,
        ButtonModule,
        RouterModule,
        StyleClassModule,
        RippleModule,
        AppConfigModule,
    ],
    declarations: [
        LandingComponent,
        HeaderLandingComponent,
        FooterLandingComponent,
        BodyLandingComponent,
    ],
})
export class LandingModule {
    constructor(private router: Router) {}
}