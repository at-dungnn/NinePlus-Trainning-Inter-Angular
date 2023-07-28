import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotPasswordRoutingModule } from './forgotpassword-routing.module';
import { ForgotPasswordComponent } from './forgotpassword.component';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { AppConfigModule } from 'src/app/layout/config/config.module';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { FooterLoginTypesModule } from '../footer-login-types/footer-login-types.module';

@NgModule({
    imports: [
        CommonModule,
        ButtonModule,
        InputTextModule,
        ForgotPasswordRoutingModule,
        FooterLoginTypesModule,
        AppConfigModule,
        RippleModule,
        FormsModule,
        ToastModule,
    ],
    declarations: [ForgotPasswordComponent],
    providers: [],
})
export class ForgotPasswordModule {}
