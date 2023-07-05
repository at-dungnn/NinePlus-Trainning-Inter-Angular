import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService} from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { MESSAGE_TITLE } from 'src/app/shared';
import { CustomerService } from 'src/app/demo/service/customer.service';
import { Customer } from 'src/app/demo/api/customer';

@Component({
    templateUrl: './customer-list.component.html',
    providers: [ConfirmationService, MessageService, DialogService]
})
export class CustomerListComponent implements OnInit {

    dateFormat: string = "mm/dd/yy";

    tbDate: string = "";

    selectedcustomers: Customer[] = [];

    submitted: boolean = false;

    rowsPerPageOptions = [5, 15, 25];

    customers: Customer[] = [];

    customer: Customer = {};

    isSkelaton: boolean = true;



    constructor(
        private router: Router,
        private confirmationService: ConfirmationService,
        private messageService: MessageService,
        public dialogService: DialogService,
        private customerService: CustomerService
    ) { }



    ngOnInit() {
        setTimeout(() => {
            this.isSkelaton = false
        }, 2000)
        this.customerService.getCustomer().then(customers => this.customers = customers)
    }
    navigateToCreateCustomer() {
        this.router.navigate(['customer/create'])
    }
    navigateToEditCustomer(customer: Customer) {
        this.router.navigate(['customer/edit/' + customer.id])
    }
    navigateToDeatailCustomer(customer: Customer) {
        this.router.navigate(['customer/detail/' + customer.id])
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
}