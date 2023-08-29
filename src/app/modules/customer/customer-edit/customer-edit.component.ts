import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { isEmpty } from 'lodash';
import { MessageService } from 'primeng/api';
import { Customer } from 'src/app/demo/api/customer';
import { HandleString, MESSAGE_ERROR_INPUT, MESSAGE_TITLE, REGIX, ROUTER, TOAST } from 'src/app/shared';
import { CustomerService } from 'src/app/shared/services/customer.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { FormatPhone } from 'src/app/shared/validator/phone';

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

    minDate!: Date;

    maxDate!: Date;

    keyToast = TOAST.KEY_BC;

    rgName: RegExp = REGIX.name;

    rgAddress: RegExp = REGIX.address;

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
        this.patchValueFormUpdate();
        this.initMinAndMaxDateOfBirth();
    }

    getIdParamRequest() {
        this._activatedRoute.paramMap.subscribe((params) => {
            this.customerId = params.get('id') + '';
        });
    }

    initFormUpdateCustomer() {
        this.formUpdateCustomer = this._fb.group(
            {
                id: [this.customerId],
                customerName: ['', [Validators.required]],
                phoneNumber: ['', [Validators.required, Validators.minLength(10)]],
                address: [''],
                dateOfBirth: [''],
                totalMoney: [0],
            },
            {
                validator: [FormatPhone.formatValidator('phoneNumber')],
            }
        );
    }

    patchValueFormUpdate() {
        this._customerService.getCustomerById(this.customerId).subscribe({
            next: (data) => {
                if (!isEmpty(data)) {
                    const validators = this.formUpdateCustomer.get('phoneNumber')?.validator;
                    const customer = data as Customer;
                    customer.id = Number(this.customerId);
                    if (customer.dateOfBirth) {
                        this.formUpdateCustomer.patchValue({
                            ...customer,
                            dateOfBirth: new Date(customer.dateOfBirth),
                        });
                        if (validators) {
                            this.formUpdateCustomer.get('phoneNumber')?.setValidators(validators);
                            this.formUpdateCustomer.get('phoneNumber')?.updateValueAndValidity();
                        }
                    } else {
                        this.formUpdateCustomer.patchValue({
                            ...customer,
                        });
                    }
                }
            },
            error: (err) => {
                this._router.navigate([ROUTER.LIST_CUSTOMER]);
            },
        });
    }

    initMinAndMaxDateOfBirth() {
        this.minDate = new Date();
        this.maxDate = new Date();
        this.minDate.setFullYear(this.maxDate.getFullYear() - 100);
        this.maxDate.setFullYear(this.maxDate.getFullYear() - 15);
    }

    trimValueCustomer(customer: Customer): Customer {
        if (customer.customerName) {
            customer.customerName = HandleString.trim(customer.customerName);
        }
        if (customer.address) {
            customer.address = HandleString.trim(customer.address);
        }
        // "The JSON value could not be converted to System.Nullable`1[System.DateTime]
        if (!customer.dateOfBirth) {
            delete customer['dateOfBirth'];
        } else {
            customer.dateOfBirth = this.convertDateOfBirth(customer);
        }
        return customer;
    }
    onSubmit() {
        this.loadingSubmit();
        this.submitted = true;
        if (this.formUpdateCustomer.valid) {
            let updateCustomer = this.trimValueCustomer(this.valueFormUpdateCustomer);
            this._customerService.getCustomerById(this.customerId).subscribe({
                next: (data) => {
                    if (!isEmpty(data)) {
                        this.saveCustomer(updateCustomer);
                    }
                },
                error: (err) => {
                    this.showErrorResponse(err);
                },
            });
        } else {
            this._toastService.showError(MESSAGE_ERROR_INPUT.VALID, this.keyToast);
        }
    }

    saveCustomer(customer: Customer) {
        this._customerService.updateCustomer(customer).subscribe({
            next: (res) => {
                if (res.succeeded && res.data) {
                    this._toastService.showSuccess(MESSAGE_TITLE.EDIT_SUCC, this.keyToast);
                    setTimeout(() => {
                        this.navigateToListCustomer();
                    }, 1500);
                }
            },
            error: (err) => {
                this.showErrorResponse(err);
            },
        });
    }

    showErrorResponse(err: HttpErrorResponse): void {
        if (err.error?.messages?.length > 0) {
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
