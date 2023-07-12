import { Component } from '@angular/core';
import { Customer } from 'src/app/demo/api/customer';
import { CustomerService } from 'src/app/demo/service/customer.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Employee } from 'src/app/demo/api/employee';
import { EmployeeService } from 'src/app/shared';
import { error } from 'console';
@Component({
    selector: 'app-employee-list',
    templateUrl: './employee-list.component.html',
    styleUrls: ['./employee-list.component.scss'],
    providers: [MessageService],
})
export class EmployeeListComponent {
    overlayVisible: boolean = false;
    genders: any[] = [];
    value10: any;
    isSkeleton: boolean = true;
    employees: Employee[] = [];
    employee: Employee = {};
    deleteProductsDialog = false;

    constructor(private employeeService: EmployeeService, private messageService: MessageService, private router: Router) {}

    ngOnInit() {
        this.onInitApi();
        setTimeout(() => {
            this.isSkeleton = false;
        }, 1500);
    }

    messageErrorDelete() {
        this.messageService.add({ severity: 'error', summary: 'Notification', detail: 'Delete Failure' });
    }

    onInitApi() {
        this.employeeService.getList().subscribe(
            (next) => {
                this.employees = next;
                // console.log(this.employees);
            },
            (error) => {
                console.log(error);
            }
        );
    }

    confirmDelete(employee: Employee) {
        // console.log(employee.id?.toString());
        if (employee.id != -1 && employee.id != undefined) {
            // console.log(employee.id);
            this.employee = { ...employee };
            this.deleteProductsDialog = true;
        }
    }

    deleteConfirmed() {
        if (this.employee.id) {
            this.deleteProductsDialog = true;
            this.employeeService.deleteById(this.employee.id.toString(), 'id').subscribe(
                (next) => {
                    this.deleteProductsDialog = false;
                    this.onInitApi();
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
                },
                (error) => {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Products Delete Falied', life: 3000 });
                }
            );
        }
    }

    toggle() {
        this.overlayVisible = !this.overlayVisible;
    }

    navigateToCreateEmployee() {
        this.router.navigate(['manage-employee/create']);
    }

    navigateToEditEmployee(id:number) {
        this.router.navigate(['manage-employee/edit/' + id]);
    }
    onGlobalFilter(firt: any, event: any) {}
}
