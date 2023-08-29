import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Customer } from 'src/app/demo/api/customer';
import { HandleString, MESSAGE_ERROR_INPUT, MESSAGE_TITLE, MatchPassword, REGIX, ROUTER, TOAST } from 'src/app/shared';
import { CustomerService } from 'src/app/shared/services/customer.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormatPhone } from 'src/app/shared/validator/phone';

@Component({
    selector: 'app-customer-create',
    templateUrl: './customer-create.component.html',
    providers: [MessageService, ToastService],
})
export class CustomerCreateComponent implements OnInit {
    submitted: boolean = false;

    isLoadingSubmit = false;

    minDate!: Date;

    maxDate!: Date;

    rgName: RegExp = REGIX.name;

    rgAddress: RegExp = REGIX.address;

    rgPassword: RegExp = REGIX.password;

    formAddNewCustomer!: FormGroup;

    keyToast = TOAST.KEY_BC;

    constructor(private _customerService: CustomerService, private _router: Router, private _toastService: ToastService, private _fb: FormBuilder) {}

    ngOnInit(): void {
        this.initFormAddNewCustomer();
        this.initMinAndMaxDateOfBirth();
    }

    initFormAddNewCustomer() {
        this.formAddNewCustomer = this._fb.group(
            {
                customerName: ['', [Validators.required]],
                phoneNumber: ['', [Validators.required, Validators.minLength(10)]],
                address: [''],
                dateOfBirth: [''],
                username: [null],
                password: [null],
                totalMoney: [0],
            },
            {
                validator: [FormatPhone.formatValidator('phoneNumber')],
            }
        );
    }

    initMinAndMaxDateOfBirth() {
        this.minDate = new Date();
        this.maxDate = new Date();
        this.minDate.setFullYear(this.maxDate.getFullYear() - 100);
        this.maxDate.setFullYear(this.maxDate.getFullYear() - 15);
    }

    onSubmit() {
        this.submitted = true;
        this.loadingSubmit();
        if (this.formAddNewCustomer.valid) {
            if (!this.valueFormAddNewCustomer.password) {
                this.formAddNewCustomer.patchValue({
                    password: null,
                });
            }
            if (!this.valueFormAddNewCustomer.username) {
                this.formAddNewCustomer.patchValue({
                    username: null,
                });
            }
            let newCustomer = this.trimValueCustomer(this.valueFormAddNewCustomer);
            if (this.isValidUsernameAndPassword(newCustomer) === true) {
                this.saveCustomer(newCustomer);
            }
        } else {
            this._toastService.showError(MESSAGE_ERROR_INPUT.VALID, this.keyToast);
        }
    }

    trimValueCustomer(customer: Customer): Customer {
        if (customer.customerName) {
            customer.customerName = HandleString.trim(customer.customerName);
        }
        if (customer.address) {
            customer.address = HandleString.trim(customer.address);
        }
        if (!customer.dateOfBirth) {
            // "The JSON value could not be converted to System.Nullable`1[System.DateTime]
            delete customer['dateOfBirth'];
        } else {
            customer.dateOfBirth = this.convertDateOfBirth(customer);
        }
        return customer;
    }

    isValidUsernameAndPassword(customer: Customer): boolean {
        const password = customer?.password;
        const username = customer?.username;

        if ((!username && password) || (username && !password)) {
            this._toastService.showError(MESSAGE_ERROR_INPUT.PASSWORD_OR_USERNAME_EMPTY, this.keyToast);
            return false;
        } else if (username && password) {
            const startUsername = username.slice(0, 6);
            if (username === password || password.startsWith(startUsername)) {
                this._toastService.showError(MESSAGE_ERROR_INPUT.PASSWORD_MATCH_USERNAME, this.keyToast);
                return false;
            }

            if (username && username.length < 8) {
                this._toastService.showError(MESSAGE_ERROR_INPUT.MIN_LENGTH_USERNAME, this.keyToast);
                return false;
            }

            if (password && password.length < 8) {
                this._toastService.showError(MESSAGE_ERROR_INPUT.MIN_LENGTH_PASSWORD, this.keyToast);
                return false;
            }
        }
        return true;
    }

    saveCustomer(newCustomer: Customer) {
        this._customerService.postCustomer(newCustomer).subscribe({
            next: (res) => {
                if (res.succeeded) {
                    this._toastService.showSuccess(MESSAGE_TITLE.ADD_SUCCESS, this.keyToast);
                    setTimeout(() => {
                        this._router.navigate([ROUTER.LIST_CUSTOMER]);
                    }, 1500);
                }
            },
            error: (err) => {
                this.showErrorResponse(err);
            },
        });
    }

    showErrorResponse(err: HttpErrorResponse): void {
        if (err.status === 400 && err.error?.messages?.length > 0) {
            err.error.messages?.forEach((ms: string) => {
                this._toastService.showError(ms, this.keyToast);
            });
        }
    }

    convertDateOfBirth(customer: Customer) {
        const originalDate = new Date(customer?.dateOfBirth + '');
        const year = originalDate.getFullYear();
        const month = String(originalDate.getMonth() + 1).padStart(2, '0');
        const day = String(originalDate.getDate()).padStart(2, '0');
        const hours = String(originalDate.getHours()).padStart(2, '0');
        const minutes = String(originalDate.getMinutes()).padStart(2, '0');
        const seconds = String(originalDate.getSeconds()).padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    }

    navigateToListCustomer() {
        this._router.navigate([ROUTER.LIST_CUSTOMER]);
    }

    loadingSubmit() {
        this.isLoadingSubmit = true;
        setTimeout(() => (this.isLoadingSubmit = false), 1300);
    }

    get f() {
        return this.formAddNewCustomer.controls;
    }

    get valueFormAddNewCustomer() {
        return this.formAddNewCustomer.value;
    }
}
