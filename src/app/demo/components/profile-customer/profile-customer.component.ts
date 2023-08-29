import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { HandleString, MESSAGE_ERROR_INPUT, MESSAGE_TITLE, REGIX, ROUTER, TOAST } from 'src/app/shared';
import { CustomerService } from 'src/app/shared/services/customer.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { Customer } from '../../api/customer';
import { isEmpty } from 'lodash';
import { HttpErrorResponse } from '@angular/common/http';
import { SessionService } from 'src/app/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-profile-customer',
    templateUrl: './profile-customer.component.html',
    styleUrls: ['./profile-customer.component.scss'],
    providers: [ToastService, MessageService],
})
export class ProfileCustomerComponent {
    submitted: boolean = false;

    isLoading = false;

    formUpdateCustomer!: FormGroup;

    keyToast = TOAST.KEY_BC;

    minDate!: Date;

    maxDate!: Date;

    rgName: RegExp = REGIX.name;

    rgAddress: RegExp = REGIX.address;

    customerId = '';

    constructor(
        private _layoutService: LayoutService,
        private _customerService: CustomerService,
        private _sessionService: SessionService,
        private _toastService: ToastService,
        private _fb: FormBuilder,
        private _router: Router
    ) {}

    ngOnInit(): void {
        this.getIdCustomer();
        this.initFormUpdateCustomer();
        this.initMinAndMaxDateOfBirth();
    }

    getIdCustomer() {
        this.customerId = this._sessionService.userAuthenticate?.userId;
    }

    initFormUpdateCustomer() {
        this.formUpdateCustomer = this._fb.group({
            id: [this.customerId],
            customerName: ['', [Validators.required]],
            phoneNumber: ['', [Validators.required, Validators.minLength(10)]],
            address: [''],
            dateOfBirth: [''],
            totalMoney: [0],
        });
        this._customerService.getCustomerById(this.customerId).subscribe((data) => {
            if (!isEmpty(data)) {
                const customer = data as Customer;
                this.formUpdateCustomer.patchValue(customer);
                if (customer.dateOfBirth) {
                    this.formUpdateCustomer.patchValue({
                        dateOfBirth: new Date(customer.dateOfBirth),
                    });
                }
            }
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
        this.isLoading = true;
        this.submitted = true;
        if (this.formUpdateCustomer.valid) {
            const updateCustomer = this.trimValueCustomer(this.valueFormUpdateCustomer);
            this.saveCustomer(updateCustomer);
        } else {
            setTimeout(() => {
                this.isLoading = false;
            }, 1000);
            this._toastService.showError(MESSAGE_ERROR_INPUT.VALID, this.keyToast);
        }
    }

    saveCustomer(customer: Customer) {
        this._customerService.updateCustomer(customer).subscribe({
            next: (res) => {
                if (!isEmpty(res.data)) {
                    setTimeout(() => {
                        this.isLoading = false;
                    }, 1000);
                    this._toastService.showSuccess(MESSAGE_TITLE.EDIT_SUCC, this.keyToast);
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                }
            },
            error: (err) => {
                setTimeout(() => {
                    this.isLoading = false;
                }, 1000);
                this.showErrorResponse(err);
            },
        });
    }

    get filledInput(): boolean {
        return this._layoutService.config.inputStyle === 'filled';
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

    showErrorResponse(err: HttpErrorResponse): void {
        if (err.error?.messages?.length > 0) {
            err.error.messages?.forEach((ms: string) => {
                this._toastService.showError(ms, this.keyToast);
            });
        }
    }

    navigateToLanding() {
        this._router.navigate([ROUTER.LANDING]);
    }

    get f() {
        return this.formUpdateCustomer.controls;
    }

    get valueFormUpdateCustomer() {
        return this.formUpdateCustomer.value;
    }
}
