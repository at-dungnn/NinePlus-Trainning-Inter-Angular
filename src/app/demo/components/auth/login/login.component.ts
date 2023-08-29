import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AuthenticateService, SessionService } from 'src/app/core';
import { ToastService } from 'src/app/shared/services/toast.service';
import { MESSAGE_ERROR_INPUT, MESSAGE_TITLE, REGIX, ROUTER, TOAST } from 'src/app/shared';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ROLE } from 'src/app/shared/constants/role';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    providers: [MessageService, ToastService],
})
export class LoginComponent {
    @Input() isPopupLogin = false;
    @Output() hiddenPopup: EventEmitter<any> = new EventEmitter();
    formLogin!: FormGroup;
    isLoadingSubmit = false;
    keyToast = TOAST.KEY_BC;
    rgPassword: RegExp = REGIX.password;
    constructor(
        private _authenticateService: AuthenticateService,
        private _toastService: ToastService,
        private _router: Router,
        private _fb: FormBuilder
    ) {}
    ngOnInit(): void {
        this.initFormLogIn();
    }

    submit() {
        this.isLoadingSubmit = true;
        if (this.formLogin.valid) {
            this._authenticateService.login(this.valueForm.employeeNo, this.valueForm.password).subscribe({
                next: (res) => {
                    const role = res.data.role;
                    this._toastService.showSuccess(MESSAGE_TITLE.LOGIN_SUCC, this.keyToast);
                    if (role === ROLE.CUSTOMER || role === ROLE.EMPLOYEE) {
                        this.isLoadingSubmit = false;
                        if (window.location.pathname.endsWith('landing')) {
                            setTimeout(() => {
                                window.location.reload();
                            }, 1000);
                        } else {
                            setTimeout(() => {
                                this._router.navigate([ROUTER.LANDING]);
                            }, 1000);
                        }
                    } else if (role === ROLE.SUPERADMIN) {
                        setTimeout(() => {
                            this._router.navigate([ROUTER.DASHBOARD]);
                        }, 1000);
                    }
                },
                error: (err) => {
                    this.showErrorResponse(err);
                    setTimeout(() => {
                        this.isLoadingSubmit = false;
                    }, 1000);
                },
            });
        } else {
            setTimeout(() => {
                this.isLoadingSubmit = false;
            }, 1000);
            if (!this.valueForm.employeeNo) {
                this._toastService.showError(MESSAGE_ERROR_INPUT.USERNAME_REQUIRED, this.keyToast);
            } else if (this.valueForm.password.length <= 8) {
                this._toastService.showError(MESSAGE_ERROR_INPUT.MIN_LENGTH_PASSWORD, this.keyToast);
            }
        }
    }

    showErrorResponse(err: HttpErrorResponse): void {
        if (err.error.messages && err.error.messages.length > 0) {
            err.error.messages.forEach((ms: string) => {
                this._toastService.showError(ms, this.keyToast);
            });
        }
    }

    initFormLogIn() {
        this.formLogin = this._fb.group({
            employeeNo: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(8)]],
        });
    }

    closeFormLogin() {
        this.formLogin.reset();
        this.hiddenPopup.emit();
    }

    navigateToForgotPassword() {
        this._router.navigate([ROUTER.FORGOT_PASSWORD]);
    }
    navigateSignup() {
        this._router.navigate([ROUTER.SIGNUP]);
    }
    get f() {
        return this.formLogin.controls;
    }
    get valueForm() {
        return this.formLogin.value;
    }
}
