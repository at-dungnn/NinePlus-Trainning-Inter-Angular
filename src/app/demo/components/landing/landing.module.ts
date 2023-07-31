import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing.component';
import { Router, RouterModule } from '@angular/router';
import { StyleClassModule } from 'primeng/styleclass';
import { AppConfigModule } from 'src/app/layout/config/config.module';
import { HeaderLandingComponent } from './header/header-landing/header-landing.component';
import { FooterLandingComponent } from './footer/footer-landing/footer-landing.component';
import { BodyLandingComponent } from './body/body-landing/body-landing.component';
import { SharedModule } from 'src/app/shared';
import { LoginComponent } from '../auth/login/login.component';
import { FormsModule } from '@angular/forms';
import { FooterLoginTypesModule } from '../auth/footer-login-types/footer-login-types.module';

@NgModule({
    imports: [
        CommonModule,
        LandingRoutingModule,
        RouterModule,
        StyleClassModule,
        AppConfigModule,
        SharedModule,
        FormsModule,
        FooterLoginTypesModule,
        
    ],
    declarations: [
        LandingComponent,
        HeaderLandingComponent,
        FooterLandingComponent,
        BodyLandingComponent,
        LoginComponent,
    ],
})
export class LandingModule {
    constructor(private router: Router) {}
}