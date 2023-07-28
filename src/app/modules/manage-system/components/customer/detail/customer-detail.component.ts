import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { isEmpty } from 'lodash';
import { DialogService } from 'primeng/dynamicdialog';
import { Customer } from 'src/app/demo/api/customer';
import { ROUTER } from 'src/app/shared';
import { CustomerService } from 'src/app/shared/services/customer.service';

@Component({
    selector: 'app-customer-detail',
    templateUrl: './customer-detail.component.html',
    styleUrls: ['./customer-detail.component.scss'],
    providers: [DialogService],
})
export class CustomerDetailComponent {
    customer: Customer = {};

    dialogBooking: boolean = false;

    customerId: string = '';

    constructor(
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _customerService: CustomerService
    ) {}

    ngOnInit() {
        this.getIdRequestParam();
        this.getCustomerById(this.customerId);
    }

    getIdRequestParam() {
        this._activatedRoute.paramMap.subscribe((params) => {
            this.customerId = params.get('id') + '';
        });
    }

    getCustomerById(id: string) {
        this._customerService.getCustomerById(id).subscribe((data) => {
            if (!isEmpty(data)) {
                this.customer = data as Customer;
            }
        });
    }

    hideDialogBooking() {
        this.dialogBooking = false;
    }

    showDialogBooking() {
        this.dialogBooking = true;
    }

    navigateToListCustomer() {
        this._router.navigate([ROUTER.LIST_CUSTOMER]);
    }
}
