import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { er } from '@fullcalendar/core/internal-common';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { FilterHelper } from 'src/app/core/helpers/filter.helper';
import { Employee } from 'src/app/demo/api/employee';
import { Workshift } from 'src/app/demo/api/work-shift';
import { EmployeeService, MESSAGE_TITLE, ROUTER } from 'src/app/shared';
import { Genders } from 'src/app/shared/constants/gender';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { WorkShiftService } from 'src/app/shared/services/work-shift.service';

@Component({
    selector: 'app-employee-list',
    templateUrl: './employee-list.component.html',
    styleUrls: ['./employee-list.component.scss'],
    providers: [MessageService, ToastService, ConfirmationService],
})
export class EmployeeListComponent {
    genders: any[] = Genders;
    overlayVisible: boolean = false;
    isSkeleton: boolean = true;
    employee: Employee = {};
    employees: Employee[] = [];
    deleteProductsDialog: boolean = false;
    resetPassDialog: boolean = false;
    userNameToResetPass = '';
    formFilter!: FormGroup;
    workshifts: Workshift[] = [];
    totalRecords: number = 0;
    firstPaging = 0;

    constructor(
        private _employeeService: EmployeeService,
        private _messageService: MessageService,
        private _router: Router,
        private _confirmationService: ConfirmationService,
        private _toastService: ToastService,
        private _fb: FormBuilder,
        private _workShiftService: WorkShiftService,
        private _notificationService: NotificationService,
        private _detect: ChangeDetectorRef,
    ) { }

    ngOnInit() {
        this.initForm();
        this.loadSkeletonTable();
        this.getListWorkShift();
    }
    initForm(): void {
        this.formFilter = this._fb.group({
            keyword: [''],
            workShiftId: [''],
            gender: [''],
            pageNumber: [1],
            pageSize: [5],
            isExport: false,
        });
    }
    getListWorkShift() {
        this._employeeService.getListEmployee().subscribe({
            next: (res) => {
                this.employees = res.data as Employee[];
                if (this.employees.length === 0) {
                    this._toastService.showWarningNoKey(MESSAGE_TITLE.LIST_EMPTY);
                }
                this.toastFormAnotherScreen();
            },
            error: (error) => {
                error.error.messages.forEach((item: string) => {
                    this._toastService.showErrorNoKey(item);
                });
            },
        });
    }
    filter(event: any): void {
        if (event && event.first) {
            this.firstPaging = event.first;
        }
        event.sortField && FilterHelper.sortOrderByNoneMulti(this.formFilter, event.sortField, event.sortOrder);
        event.rows && FilterHelper.setPagingSize(this.formFilter, event.rows);
        (event.first || event.first === 0) &&
            event.rows &&
            FilterHelper.setPageNumber(this.formFilter, FilterHelper.getPageNumber(event.first, event.rows));
        this.filterEmployee();
    }
    filterEmployee() {
        this.isSkeleton = true;
        let param = FilterHelper.removeNullValue(this.formFilter.value);
        this._employeeService.filterEmployee(param).subscribe({
            next: (res: any) => {
                this.employees = res.data as Employee[];
                this.totalRecords = res.totalCount as number;
                if (this.employees.length === 0) {
                    this._toastService.showWarningNoKey(MESSAGE_TITLE.LIST_EMPTY);
                }
                this.loadSkeletonTable();
                this._detect.detectChanges();
            },
            error: (error) => {
                error.error.messages.forEach((item: string) => {
                    this._toastService.showErrorNoKey(item);
                });
            },
        });
    }

    toastFormAnotherScreen() {
        const message = this._notificationService.getMessage();
        if (message) {
            this._toastService.showSuccessNoKey(message.toString());
            this._notificationService.clearMessage();
        }
    }

    confirmDelete(employee: Employee) {
        if (employee.id != -1 && employee.id != undefined) {
            this.employee = { ...employee };
            this.deleteProductsDialog = true;
        }
    }

    confirmResetPass(employee: Employee) {
        if (employee.id) {
            this._employeeService.getEmployeeById(employee.id.toString()).subscribe({
                next: (res) => {
                    this.userNameToResetPass = res.userName;
                    this.employee = employee;
                },
                error: (error) => {
                    error.error.Messages.forEach((item: string) => {
                        this._toastService.showErrorNoKey(item);
                    });
                },
            });
        }
        this.resetPassDialog = true;
    }

    deleteConfirmed() {
        if (this.employee.id) {
            console.log(this.employee.id)
            this._employeeService.deleteEmployeeById(this.employee.id.toString()).subscribe({
                next: (next) => {
                    this._toastService.showSuccessNoKey(MESSAGE_TITLE.DELETE_SUCC);
                    this.filterEmployee();
                    this.deleteProductsDialog = false;
                    this.employee = {};
                },
                error: (error) => {
                    this._toastService.showErrorNoKey(MESSAGE_TITLE.DELETE_ERR);
                },
            });
        }
    }

    resetConfirmed() {
        if (this.userNameToResetPass) {
            this._employeeService.resetPasswordEmployee(this.userNameToResetPass).subscribe({
                next: () => {
                    this._toastService.showSuccessNoKey(MESSAGE_TITLE.RESET_PASS_SUCC);
                    this.resetPassDialog = false;
                    this.employee = {};
                },
                error: (error) => {
                    if (error.error.messages) {
                        error.error.messages.forEach((item: string) => {
                            this._toastService.showErrorNoKey(item);
                        });
                    }
                    else {
                        this._toastService.showErrorNoKey(MESSAGE_TITLE.RESET_PASS_ERR);
                    }
                },
            });
        }
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
        this._router.navigate([ROUTER.CREATE_EMPLOYEE]);
    }

    navigateToEditEmployee(id: number) {
        this._router.navigate([ROUTER.EDIT_EMPLOYEE + id]);
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
    clearFilter(): void {
        this.formFilter.reset();
        this.initForm();
        this.filterEmployee();
    }
}