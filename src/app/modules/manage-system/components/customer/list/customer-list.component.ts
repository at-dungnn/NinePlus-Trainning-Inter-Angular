import * as _ from 'lodash';
import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Customer } from 'src/app/demo/api/customer';
import { CustomerService } from 'src/app/shared/services/customer.service';
import { MESSAGE_TITLE, ROUTER, Toast } from 'src/app/shared';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
    templateUrl: './customer-list.component.html',
    providers: [
        ConfirmationService,
        DialogService,
        ToastService,
        MessageService,
    ],
})
export class CustomerListComponent implements OnInit {
    customers: Customer[] = [];

    submitted: boolean = false;

    isSkeleton: boolean = false;

    resetPageOnSort: boolean = false;

    keyToast: string = '';

    constructor(
        private _router: Router,
        private _confirmationService: ConfirmationService,
        public _dialogService: DialogService,
        private _customerService: CustomerService,
        private _toastService: ToastService
    ) {}

    ngOnInit() {
        this.showSkeleton();
        this.getListCustomer();
        this.initKeyToast();
    }

    showSkeleton() {
        this.isSkeleton = true;
        setTimeout(() => {
            this.isSkeleton = false;
        }, 2000);
    }

    getListCustomer() {
        this._customerService.getListCustomer().subscribe((res) => {
            if (res.data && res.data.length) {
                this.customers = res.data as Customer[];
            }
        });
    }

    initKeyToast() {
        this.keyToast = Toast.KEY_BC;
    }

    handleDeleteCustomer(id: string) {
        this._customerService.getCustomerById(id).subscribe({
            next: (data) => {
                if (!_.isEmpty(data)) {
                    this._customerService
                        .deleteCustomer(id)
                        .subscribe( (res) => {
                            if (res.succeeded) {
                                this.resetPageOnSort = true;
                                this.getListCustomer();
                                if (_.isEmpty(res.messages)) {
                                    res.messages?.forEach((string: string) => {
                                        this._toastService.showSuccess(
                                            string,
                                            this.keyToast
                                        );
                                    });
                                }
                            }
                        });
                }
            },
            error: (err) => {
                console.log(err);
                this.getListCustomer();
            },
        });
    }

    navigateToCreateCustomer() {
        this._router.navigate([ROUTER.CREATE_CUSTOMER]);
    }

    navigateToEditCustomer(customer: Customer) {
        this._router.navigate([ROUTER.EDIT_CUSTOMER + '/' + customer.id]);
    }

    navigateToDeatailCustomer(customer: Customer) {
        this._router.navigate([ROUTER.DETAIL_CUSTOMER + '/' + customer.id]);
    }

    showConfirmDelete(customer: Customer) {
        this._confirmationService.confirm({
            message: `${MESSAGE_TITLE.CONFIRM_DELETE} ${customer.customerName}?`,
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            key: 'confirm',
            accept: () => {
                this.handleDeleteCustomer(customer.id + '');
                this._confirmationService.close();
            },
            reject: () => {
                this._confirmationService.close();
            },
        });
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }
}
