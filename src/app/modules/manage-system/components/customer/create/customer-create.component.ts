import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Customer } from 'src/app/demo/api/customer';
import {
    HandleString,
    MESSAGE_ERROR_INPUT,
    MESSAGE_TITLE,
    ROUTER,
    Toast,
} from 'src/app/shared';
import * as _ from 'lodash';
import { CustomerService } from 'src/app/shared/services/customer.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-customer-create',
    templateUrl: './customer-create.component.html',
    providers: [MessageService, ToastService],
})
export class CustomerCreateComponent implements OnInit {
    submitted: boolean = false;

    isLoadingSubmit = false;

    phoneNumberParttern = '[()0-9]{10,12}';

    formAddNewCustomer!: FormGroup;

    keyToast: string = '';

    constructor(
        private _customerService: CustomerService,
        private _router: Router,
        private _toastService: ToastService,
        private _fb: FormBuilder
    ) {}

    ngOnInit(): void {
        this.initFormAddNewCustomer();
        this.initKeyToast();
    }

    initKeyToast() {
        this.keyToast = Toast.KEY_BC;
    }

    initFormAddNewCustomer() {
        this.formAddNewCustomer = this._fb.group({
            customerName: ['', [Validators.required, Validators.minLength(4)]],
            phoneNumber: [
                '',
                [
                    Validators.required,
                    Validators.pattern(this.phoneNumberParttern),
                ],
            ],
            address: [''],
            dateOfBirth: [''],
            username: [''],
            password: [''],
            totalMoney: [0],
        });
    }

    onSubmit() {
        this.submitted = true;
        this.loadingSubmit();
        if (this.formAddNewCustomer.valid) {
            let newCustomer = this.trimValueCustomer(
                this.valueFormAddNewCustomer
            );
            this._customerService.getListCustomer().subscribe((res) => {
                if (res.data && res.data.length > 0) {
                    if (
                        this.isValidUsernameAndPassword(
                            newCustomer,
                            res.data as Customer[]
                        ) === true
                    ) {
                        this.saveCustomer(newCustomer);
                    }
                }
            });
        } else {
            this._toastService.showError(
                MESSAGE_ERROR_INPUT.VALID,
                this.keyToast
            );
        }
    }

    trimValueCustomer(customer: Customer): Customer {
        if (customer.customerName) {
            customer.customerName = HandleString.trim(customer.customerName);
        }
        if (customer.address) {
            customer.address = HandleString.trim(customer.address);
        }
        // "The JSON value could not be converted to System.Nullable`1[System.DateTime]
        if (_.isEmpty(customer.dateOfBirth)) {
            delete customer['dateOfBirth'];
        }
        return customer;
    }

    isValidUsernameAndPassword(
        customer: Customer,
        customers: Customer[]
    ): boolean {
        const password = customer?.password;
        const username = customer?.username;

        if ((!username && password) || (username && !password)) {
            this._toastService.showError(
                MESSAGE_ERROR_INPUT.PASSWORD_OR_USERNAME_EMPTY,
                this.keyToast
            );
            return false;
        } else if (username && password) {
            if (username && username.length < 8) {
                this._toastService.showError(
                    MESSAGE_ERROR_INPUT.MIN_LENGTH_USERNAME,
                    this.keyToast
                );
                return false;
            }

            if (password && password.length < 8) {
                this._toastService.showError(
                    MESSAGE_ERROR_INPUT.MIN_LENGTH_PASSWORD,
                    this.keyToast
                );
                return false;
            }

            // check username exists
            let index = customers.findIndex((item) => {
                return item.username === customer.username;
            });

            if (index > -1) {
                this._toastService.showError(
                    MESSAGE_ERROR_INPUT.USERNAME_EXISTS,
                    this.keyToast
                );
                return false;
            }
        }
        return true;
    }

    saveCustomer(newCustomer: Customer) {
        this._customerService.postCustomer(newCustomer).subscribe({
            next: (res) => {
                if (res.succeeded) {
                    this._toastService.showSuccess(
                        MESSAGE_TITLE.ADD_SUCCESS,
                        this.keyToast
                    );
                    setTimeout(() => {
                        this._router.navigate([ROUTER.LIST_CUSTOMER]);
                    }, 1500);
                }
            },
            error: (err) => {
                console.log(err);
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

    keyPressPhoneNumber(event: any) {
        const pattern = /[0-9]/;
        let inputChar = String.fromCharCode(event.charCode);
        if (event.keyCode != 8 && !pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

    keyPressUsername(event: any) {
        let pattern = /[a-zA-Z0-9]/;
        let inputChar = String.fromCharCode(event.charCode);
        if (event.keyCode != 8 && !pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

    keyPressPassword(event: any) {
        let pattern = /[a-zA-Z0-9\+\-@\!\$\&\*]/;
        let inputChar = String.fromCharCode(event.charCode);
        if (event.keyCode != 8 && !pattern.test(inputChar)) {
            event.preventDefault();
        }
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
