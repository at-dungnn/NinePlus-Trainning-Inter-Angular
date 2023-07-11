import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { MESSAGE_TITLE } from 'src/app/shared';
import { CustomerService } from 'src/app/demo/service/customer.service';
import { Customer } from 'src/app/demo/api/customer';

@Component({
    templateUrl: './customer-list.component.html',
    providers: [ConfirmationService, MessageService, DialogService]
})
export class CustomerListComponent implements OnInit {

    submitted: boolean = false;

    customers: Customer[] = [];

    isSkeleton: boolean = false;

    resetPageOnSort: boolean = false;

    constructor(
        private router: Router,
        private confirmationService: ConfirmationService,
        private messageService: MessageService,
        public dialogService: DialogService,
        private customerService: CustomerService
    ) { }

    ngOnInit() {
        this.showSkeleton()
        this.fetListCustomer()
    }

    showSkeleton() {
        this.isSkeleton = true
        setTimeout(() => {
            this.isSkeleton = false
        }, 2000)
    }

    fetListCustomer() {
        this.customerService.getListCustomer().subscribe(customers => {
            this.customers = customers.reverse()
        });
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

    deleteCustomer(id: string | undefined) {
        this.customerService.getCustomerById(id).subscribe({
            next: data => {
                this.customerService.deleteCustomer(id).subscribe(res => {
                    this.resetPageOnSort = true
                    this.fetListCustomer()
                    this.showSuccess(MESSAGE_TITLE.DELETE_SUCC)
                })
            },
            error: err => {
                console.log(err);
                this.showError('Customer does not exist')
            },
        });
    }

    showConfirmDelete(customer: Customer) {
        this.confirmationService.confirm({
            message: `Are you sure you want to delete customer: ${customer.name}?`,
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            key: 'confirm',
            accept: () => {
                this.deleteCustomer(customer.id)
                this.confirmationService.close()
            },
            reject: () => {
                this.confirmationService.close()
            },
        });
    }

    showError(message: string) {
        this.messageService.add({
            key: 'bc',
            severity: 'error',
            summary: 'Error',
            detail: message,
        });
    }

    showSuccess(message: string) {
        this.messageService.add({
            key: 'bc',
            severity: 'success',
            summary: 'Success',
            detail: message
        });
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains')
    }

}