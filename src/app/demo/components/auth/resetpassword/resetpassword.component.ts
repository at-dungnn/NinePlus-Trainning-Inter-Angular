import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { cloneDeep } from 'lodash';
import { MessageService } from 'primeng/api';
import { AuthenticateService } from 'src/app/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { MESSAGE_ERROR_INPUT, MatchPassword, ROUTER, TOAST } from 'src/app/shared';
import { ToastService } from 'src/app/shared/services/toast.service';

interface ResetPassword {
    token?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
}

@Component({
    selector: 'app-resetpassword',
    templateUrl: './resetpassword.component.html',
    providers: [ToastService, MessageService],
})
export class ResetPasswordComponent {
    token = '';

    submitted: boolean = false;

    isSuccessReset = false;

    isLoading = false;

    patternEmail = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

    formReset!: FormGroup;

    keyToast = TOAST.KEY_BC;

    constructor(
        private _layoutService: LayoutService,
        private _authenticateService: AuthenticateService,
        private _toastService: ToastService,
        private _router: Router,
        private _fb: FormBuilder
    ) {}

    ngOnInit(): void {
        this.getToken();
        this.initFormResetPassword();
    }

    getToken() {
        const searchUrl = window.location.search;
        if (searchUrl && searchUrl.length > 0) {
            this.token = searchUrl.split('?Token=').join('');
        } else {
            this._router.navigate([ROUTER.AUTH_ERROR]);
        }
    }

    initFormResetPassword() {
        this.formReset = this._fb.group(
            {
                email: ['', [Validators.pattern(this.patternEmail), Validators.required]],
                password: ['', [Validators.minLength(8), Validators.required]],
                confirmPassword: ['', [Validators.minLength(8), Validators.required]],
            },
            {
                validator: MatchPassword.confirmedValidator('password', 'confirmPassword'),
            }
        );
    }

    reset() {
        this.submitted = true;
        this.isLoading = true;
        const resetPassword: ResetPassword = cloneDeep(this.valueFormReset);
        resetPassword['token'] = this.token;
        if (this.formReset.valid) {
            this._authenticateService.resestPasword(resetPassword).subscribe({
                next: (res) => {
                    // Show success reset password
                    this.isSuccessReset = true;
                },
                error: (err) => {
                    if (err.status === 400 && err.error?.messages?.length > 0) {
                        err.error.messages?.forEach((ms: string) => {
                            this._toastService.showError(ms, this.keyToast);
                        });
                    }
                },
            });
        }
        setTimeout(() => {
            this.isLoading = false;
        }, 1000);
    }

    get filledInput(): boolean {
        return this._layoutService.config.inputStyle === 'filled';
    }
    navigateToLanding() {
        this._router.navigate([ROUTER.LANDING]);
    }
    navigateToSignup() {
        this._router.navigate([ROUTER.SIGNUP]);
    }

    get f() {
        return this.formReset.controls;
    }

    get valueFormReset() {
        return this.formReset.value;
    }
}
