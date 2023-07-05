import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
// import { CustomerService } from 'src/app/demo/service/customer.service';

import { MESSAGE_TITLE } from 'src/app/shared';
import { CustomerService } from 'src/app/demo/service/customer.service';
import { Customer } from 'src/app/demo/api/customer';

@Component({
    templateUrl: './profilelist.component.html',
    providers: [ConfirmationService, MessageService, DialogService]
})
export class ProfileListComponent implements OnInit {

    dateFormat: string = "mm/dd/yy";

    tbDate: string = "";

    dialogUpdate: boolean = false;

    dialogCreate: boolean = false;

    ref: DynamicDialogRef | undefined;

    selectedcustomers: Customer[] = [];

    submitted: boolean = false;

    rowsPerPageOptions = [5, 10, 20];

    customers: Customer[] = [];

    customer: Customer = {};

    myDialogObject: any = {
        hideDialog: this.hideDialog,
        saveCustomer: this.saveCustomer,
        confirm: this.confirm
    }

    constructor(
        // private customerService: CustomerService,
        private router: Router,
        private confirmationService: ConfirmationService,
        private messageService: MessageService,
        public dialogService: DialogService,
        private customerService: CustomerService
    ) { }



    ngOnInit() {
        // this.customerService.getCustomersLarge().then(customers => this.customers = customers);
        this.customerService.getCustomer().then(customers => this.customers = customers)
    }

    showDialogUpdate(customer: Customer) {
        this.customer = { ...customer };
        this.dialogUpdate = true;
    }
    showDialogCreate() {
        this.customer = {};
        this.dialogCreate = true;
    }

    hideDialog() {
        if (this.dialogUpdate === true) {
            this.dialogUpdate = false;
        }
        if (this.dialogCreate === true) {
            this.dialogCreate = false
        }
        this.submitted = false;
        this.tbDate = ""
    }

    saveCustomer() {
        this.submitted = true;
        if (this.customer.customer_name?.trim()) {
            if (this.customer?.id) {
                // update Customer 
                this.dialogUpdate = false;
                this.customers.forEach(((customer, index) => {
                    if (customer.id === this.customer.id) {
                        this.customers[index].customer_name = this.customer.customer_name
                        this.customers[index].date_of_birth = this.customer.date_of_birth
                    }
                }))
                this.showSuccess(MESSAGE_TITLE.SAVE_SUCC)
            } else {
                // create customer
                let cloneCustomer: Customer = this.customers[this.customers.length - 1];

                this.customers[this.customers.length - 1];
                this.customers[this.customers.length] = {
                    ...this.customer,
                }
                this.dialogCreate = false;
                this.showSuccess(MESSAGE_TITLE.ADD_SUCCESS)
            }
            this.customers = [...this.customers];
            this.customer = {};
            this.tbDate = ""
        }
    }

    confirm(event: Event) {
        this.confirmationService.confirm({
            key: 'confirm2',
            target: event.target || new EventTarget,
            message: 'Are you sure that you want to proceed?',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.saveCustomer()
            },
            reject: () => {
            }
        });
    }
    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains')
    }


    handleDeleteCustomer(data: any) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to proceed?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            key: 'confirm',
            accept: () => {
                this.customers.forEach(((customer, index) => {
                    if (customer.id === data.id) {
                        setTimeout(() => {
                            delete this.customers[index]
                        }, 1300)
                    }
                }))
                this.confirmationService.close()
                this.showSuccess(MESSAGE_TITLE.DELETE_SUCC)
            },
            reject: () => {
                this.confirmationService.close()
            },
        });
    }
    showSuccess(detailMessage: string) {
        this.messageService.add({
            key: 'bc',
            severity: 'success',
            summary: 'Success',
            detail: detailMessage,
        });
    }
    isNumberKey(event: any) {
        var charCode = (event.which) ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57))
            return false;
        return true;
    }

}