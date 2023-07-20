import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Employee } from 'src/app/demo/api/employee';
import { EmployeeService } from 'src/app/shared';
import { Genders } from 'src/app/shared/constants/gender';
@Component({
    selector: 'app-employee-list',
    templateUrl: './employee-list.component.html',
    styleUrls: ['./employee-list.component.scss'],
    providers: [MessageService, ConfirmationService],
})
export class EmployeeListComponent {
    genders: any[] = Genders;
    overlayVisible: boolean = false;
    isSkeleton: boolean = true;
    employees: Employee[] = [];
    employee: Employee = {};
    deleteProductsDialog: boolean = false;

    constructor(
        private _employeeService: EmployeeService,
        private _messageService: MessageService,
        private _router: Router,
        private _confirmationService: ConfirmationService
    ) {}

    ngOnInit() {
        this.onInitApi();
        this.loadSkeletonTable();
    }

    onInitApi() {
        this._employeeService.getListBackEnd().subscribe(
            (next) => {
                if (next.data.length > 0) {
                    this.employees = next.data as Employee[];
                } else {
                    this._messageService.add({ severity: 'error', summary: 'Notification', detail: 'Not Found data!' });
                }
            },
            (error) => {
                error.error.messages.forEach((item: string) => {
                    this._messageService.add({ severity: 'error', summary: 'Notification', detail: item });
                });
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
            this._employeeService.deleteEmployeeById(this.employee.id.toString()).subscribe({
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

    messageErrorDelete() {
        this._messageService.add({ severity: 'error', summary: 'Notification', detail: 'Delete Failure' });
    }

    loadSkeletonTable() {
        setTimeout(() => {
            this.isSkeleton = false;
        }, 1000);
    }

    toggle() {
        this.overlayVisible = !this.overlayVisible;
    }

    navigateToCreateEmployee() {
        this._router.navigate(['manage-employee/create']);
    }

    navigateToEditEmployee(id: number) {
        this._router.navigate(['manage-employee/edit/' + id]);
    }

    onGlobalFilter(firt: any, event: any) {}
}
