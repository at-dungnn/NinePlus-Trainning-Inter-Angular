import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { isEmpty } from 'lodash';
import { MessageService } from 'primeng/api';
import { Customer } from 'src/app/demo/api/customer';
import {
    HandleString,
    MESSAGE_ERROR_INPUT,
    MESSAGE_TITLE,
    ROUTER,
    Toast,
} from 'src/app/shared';
import { CustomerService } from 'src/app/shared/services/customer.service';
import { ToastService } from 'src/app/shared/services/toast.service';

const MESSAGE_ERROR = {
    CHECK_ID_CUSTOMER: 'Customer does not exist or recheck internet connection',
};

@Component({
    selector: 'app-customer-edit',
    templateUrl: './customer-edit.component.html',
    providers: [MessageService, ToastService],
})
export class CustomerEditComponent implements OnInit {
    customerId: string = '';

    submitted: boolean = false;

    isLoadingSubmit: boolean = false;

    keyToast: string = '';

    phoneNumberParttern: string = '[()0-9]{10,12}';

    formUpdateCustomer!: FormGroup;

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _customerService: CustomerService,
        private _router: Router,
        private _toastService: ToastService,
        private _fb: FormBuilder
    ) {}

    ngOnInit(): void {
        this.getIdParamRequest();
        this.initFormUpdateCustomer();
        this.initKeyToast();
    }

    getIdParamRequest() {
        this._activatedRoute.paramMap.subscribe((params) => {
            this.customerId = params.get('id') + '';
        });
    }

    initKeyToast() {
        this.keyToast = Toast.KEY_BC;
    }

    initFormUpdateCustomer() {
        this._customerService.getCustomerById(this.customerId).subscribe({
            next: (data) => {
                if (!isEmpty(data)) {
                    const customer = data as Customer;
                    this.formUpdateCustomer = this._fb.group({
                        id: [this.customerId],
                        customerName: [
                            customer?.customerName,
                            [Validators.required, Validators.minLength(4)],
                        ],
                        phoneNumber: [
                            customer?.phoneNumber,
                            [
                                Validators.required,
                                Validators.pattern(this.phoneNumberParttern),
                            ],
                        ],
                        address: [customer?.address],
                        dateOfBirth: [
                            customer?.dateOfBirth
                                ? new Date(customer.dateOfBirth)
                                : '',
                        ],
                        totalMoney: [customer?.totalMoney],
                    });
                }
            },
            error: (err) => {
                console.log(err);
            },
        });
    }

    trimValueCustomer(customer: Customer): Customer {
        if (customer.customerName) {
            customer.customerName = HandleString.trim(customer.customerName);
        }
        if (customer.address) {
            customer.address = HandleString.trim(customer.address);
        }
        // "The JSON value could not be converted to System.Nullable`1[System.DateTime]
        if (isEmpty(customer.dateOfBirth)) {
            delete customer['dateOfBirth'];
        }
        return customer;
    }
    onSubmit() {
        this.loadingSubmit();
        this.submitted = true;
        if (this.formUpdateCustomer.valid) {
            let updateCustomer = this.trimValueCustomer(
                this.valueFormUpdateCustomer
            );
            this._customerService.getCustomerById(this.customerId).subscribe({
                next: (data) => {
                    if (!isEmpty(data)) {
                        this.saveCustomer(updateCustomer);
                    }
                },
                error: (err) => {
                    console.log(err);
                    this._toastService.showError(
                        MESSAGE_ERROR.CHECK_ID_CUSTOMER,
                        this.keyToast
                    );
                },
            });
        } else {
            this._toastService.showError(
                MESSAGE_ERROR_INPUT.VALID,
                this.keyToast
            );
        }
    }

    saveCustomer(customer: Customer) {
        this._customerService.updateCustomer(customer).subscribe({
            next: (res) => {
                if (res.succeeded && res.data) {
                    this._toastService.showSuccess(
                        MESSAGE_TITLE.EDIT_SUCC,
                        this.keyToast
                    );
                    setTimeout(() => {
                        this.navigateToListCustomer();
                    }, 1500);
                }
            },
            error: (err) => {
                console.log(err);
                this._toastService.showError(
                    MESSAGE_TITLE.EDIT_ERR,
                    this.keyToast
                );
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

    loadingSubmit() {
        this.isLoadingSubmit = true;
        setTimeout(() => (this.isLoadingSubmit = false), 1300);
    }

    navigateToListCustomer() {
        this._router.navigate([ROUTER.LIST_CUSTOMER]);
    }

    get f() {
        return this.formUpdateCustomer.controls;
    }

    get valueFormUpdateCustomer() {
        return this.formUpdateCustomer.value;
    }
}
