import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DividerModule } from 'primeng/divider';
import { ToastModule } from 'primeng/toast';
import { ChangePasswordRoutingModule } from './changepassword-routing.component';
import { ChangePasswordComponent } from './changepassword.component';
import { AppConfigModule } from 'src/app/layout/config/config.module';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
    declarations: [ChangePasswordComponent],
    imports: [
        CommonModule,
        ButtonModule,
        RippleModule,
        InputTextModule,
        ToastModule,
        DividerModule,
        FormsModule,
        ReactiveFormsModule,
        ChangePasswordRoutingModule,
        AppConfigModule,
    ],
})
export class ChangePasswordModule {}
