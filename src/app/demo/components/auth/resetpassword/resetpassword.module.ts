import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResetPasswordRoutingModule } from './resetpassword-routing.module';
import { AppConfigModule } from 'src/app/layout/config/config.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterLoginTypesModule } from '../footer-login-types/footer-login-types.module';
import { ToastModule } from 'primeng/toast';
import { ResetPasswordComponent } from './resetpassword.component';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';

@NgModule({
    declarations: [ResetPasswordComponent],
    imports: [
        CommonModule,
        ResetPasswordRoutingModule,
        AppConfigModule,
        FooterLoginTypesModule,
        FormsModule,
        ToastModule,
        InputTextModule,
        RippleModule,
        ButtonModule,
        ReactiveFormsModule,
    ],
})
export class ResetPasswordModule {}
