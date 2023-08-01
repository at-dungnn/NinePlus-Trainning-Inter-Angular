import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AuthenticateService, SessionService } from 'src/app/core';
import { ToastService } from 'src/app/shared/services/toast.service';
import { MESSAGE_ERROR_INPUT, MESSAGE_TITLE, ROUTER, TOAST } from 'src/app/shared';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ROLE } from 'src/app/shared/constants/role';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    providers: [MessageService, ToastService],
})
export class LoginComponent {
    @Input() isPopupLogin = false;

    @Output() hiddenPopup: EventEmitter<any> = new EventEmitter();

    username = '';

    password = '';

    isLoadingSubmit = false;

    keyToast = TOAST.KEY_BC;

    constructor(
        private _authenticateService: AuthenticateService,
        private _toastService: ToastService,
        private _router: Router,
        private _sessionService: SessionService
    ) {}

    submit() {
        this.isLoadingSubmit = true;
        if (!this.username || !this.password) {
            this._toastService.showError(MESSAGE_ERROR_INPUT.INCORRECT_ACCOUNT, this.keyToast);
        } else {
            this._authenticateService.login(this.username, this.password).subscribe({
                next: (res) => {
                    let role = res.data.role;
                    this._toastService.showSuccess(MESSAGE_TITLE.LOGIN_SUCC, this.keyToast);
                    if (role === ROLE.CUSTOMER || role === ROLE.EMPLOYEE) {
                        setTimeout(() => {
                            window.location.reload();
                        }, 1000);
                    } else if (role === ROLE.SUPERADMIN) {
                        setTimeout(() => {
                            this._router.navigate([ROUTER.LIST_BOOKING]);
                        }, 1000);
                    }
                },
                error: (err) => {
                    this.showErrorResponse(err);
                },
            });
        }
        setTimeout(() => {
            this.isLoadingSubmit = false;
        }, 1000);
    }

    showErrorResponse(err: HttpErrorResponse): void {
        if (err.status === 400 && err.error?.messages?.length > 0) {
            err.error.messages?.forEach((ms: string) => {
                this._toastService.showError(ms, this.keyToast);
            });
        }
    }

    closeFormLogin() {
        // child call parent
        this.hiddenPopup.emit();
    }

    navigateToForgotPassword() {
        this._router.navigate([ROUTER.FORGOT_PASSWORD]);
    }
    navigateSignup() {
        this._router.navigate([ROUTER.SIGNUP]);
    }
}
