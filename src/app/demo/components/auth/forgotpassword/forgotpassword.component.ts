import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthenticateService } from 'src/app/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { MESSAGE_ERROR_INPUT, ROUTER, TOAST, TYPE } from 'src/app/shared';
import { ToastService } from 'src/app/shared/services/toast.service';
import { environment } from 'src/environments/environment';

@Component({
    templateUrl: './forgotpassword.component.html',
    providers: [ToastService, MessageService],
})
export class ForgotPasswordComponent {
    email: string = '';

    isShowForgotSuccess = false;

    keyToast = TOAST.KEY_BC;

    isLoading = false;

    submitted = false;

    constructor(
        private _layoutService: LayoutService,
        private _authenticateService: AuthenticateService,
        private _toastService: ToastService,
        private _router: Router
    ) {}

    get filledInput(): boolean {
        return this._layoutService.config.inputStyle === 'filled';
    }

    sendMail() {
        this.isLoading = true;
        this.submitted = true;
        if (this.isCheckEmail(this.email)) {
            const payload = {
                email: this.email,
                urlFE: environment.originPath,
            };
            this._authenticateService.sendMailForGot(payload).subscribe({
                next: (res) => {
                    this.isLoading = false;
                    this.isShowForgotSuccess = true;
                },
                error: (err) => {
                    if (err.error.messages?.length > 0) {
                        err.error.messages?.forEach((ms: string) => {
                            this._toastService.showError(ms, this.keyToast);
                        });
                    }
                    setTimeout(() => {
                        this.isLoading = false;
                    }, 1000);
                },
            });
        } else {
            this._toastService.showError(MESSAGE_ERROR_INPUT.EMAIL_INVALID, this.keyToast);
            setTimeout(() => {
                this.isLoading = false;
            }, 1000);
        }
    }

    isCheckEmail(email: string): boolean {
        const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return expression.test(email);
    }

    navigateToLanding() {
        this._router.navigate([ROUTER.LANDING], { queryParams: { type: TYPE.LOGIN } });
    }
    navigateToSignup() {
        this._router.navigate([ROUTER.SIGNUP]);
    }
}
