import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Employee, EmployeeTest } from 'src/app/demo/api/employee';
import { EmployeeService } from 'src/app/shared';
@Component({
    selector: 'app-employee-list',
    templateUrl: './employee-list.component.html',
    styleUrls: ['./employee-list.component.scss'],
    providers: [MessageService, ConfirmationService],
})
export class EmployeeListComponent {
    overlayVisible: boolean = false;
    genders: string[] = [];
    isSkeleton: boolean = true;
    employees: Employee[] = [];
    tests: any[] = [];
    employee: Employee = {};
    deleteProductsDialog: boolean = false;
    employeeTest: EmployeeTest[] = [];

    constructor(
        private employeeService: EmployeeService,
        private _messageService: MessageService,
        private router: Router,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit() {
        this.onInitApi();
        setTimeout(() => {
            this.isSkeleton = false;
        }, 1500);
    }

    messageErrorDelete() {
        this._messageService.add({ severity: 'error', summary: 'Notification', detail: 'Delete Failure' });
    }

    onInitApi() {
        this.employeeService.getListBackEnd().subscribe(
            (next) => {
                // this.tests = next;
                // console.log(this.tests);
                this.employeeTest = next.data;
                // console.log(this.employeeTest);
            },
            (error) => {
                console.log(error);
            }
        );
    }

    confirmDelete(employee: Employee) {
        if (employee.id != -1 && employee.id != undefined) {
            this.employee = { ...employee };
            this.deleteProductsDialog = true;
        }
    }

    deleteConfirmed() {
        if (this.employee.id) {
            this.employeeService.deleteEmployeeById(this.employee.id.toString()).subscribe({
                next: () => {
                    this._messageService.add({
                        severity: 'success',
                        summary: 'Thành công',
                        detail: 'Xóa Branch thành công',
                        life: 3000,
                    });
                    this.onInitApi();
                    this.deleteProductsDialog = false;
                },
                error: () => {
                    this._messageService.add({ severity: 'error', summary: 'Error', detail: 'Products Delete Falied', life: 3000 });
                },
            });
        }
    }

    toggle() {
        this.overlayVisible = !this.overlayVisible;
    }

    navigateToCreateEmployee() {
        this.router.navigate(['manage-employee/create']);
    }

    navigateToEditEmployee(id: number) {
        this.router.navigate(['manage-employee/edit/' + id]);
    }

    onGlobalFilter(firt: any, event: any) {}
}
