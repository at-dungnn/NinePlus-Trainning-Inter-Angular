import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Employee } from 'src/app/demo/api/employee';
import { EmployeeService, MESSAGE_TITLE, ROUTER } from 'src/app/shared';
import { Genders } from 'src/app/shared/constants/gender';
import { Table } from 'primeng/table';
import { ToastService } from 'src/app/shared/services/toast.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { WorkShiftService } from 'src/app/shared/services/work-shift.service';
import { Workshift } from 'src/app/demo/api/work-shift';
import { NotificationService } from 'src/app/shared/services/notification.service';

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

    constructor(
        private _employeeService: EmployeeService,
        private _messageService: MessageService,
        private _router: Router,
        private _confirmationService: ConfirmationService,
        private _toastService: ToastService,
        private _fb: FormBuilder,
        private _workShiftService: WorkShiftService,
        private _notificationService: NotificationService,
    ) { }

    ngOnInit() {
        this.onInitApi();
        this.loadSkeletonTable();
        this.getListWorkShift();
        this.initFormFilter();
    }

    onInitApi() {
        this._employeeService.getListEmployee().subscribe({
            next: (res) => {
                if (res.data.length > 0) {
                    this.employees = res.data as Employee[];
                } else {
                    this._toastService.showWarningNoKey(MESSAGE_TITLE.LIST_EMPTY);
                }
                this.toastFormAnotherScreen();
                this.initFormFilter();
            },
            error: (error) => {
                error.error.messages.forEach((item: string) => {
                    this._toastService.showErrorNoKey(item);
                });
            },
        });
    }

    getListWorkShift() {
        this._workShiftService.getListWorkShift().subscribe({
            next: (res) => {
                this.workshifts = res.data as Workshift[];
                if (this.workshifts.length === 0) {
                    this._toastService.showWarningNoKey(MESSAGE_TITLE.LIST_EMPTY);
                }
            },
            error: (error) => {
                error.error.messages.forEach((item: string) => {
                    this._toastService.showErrorNoKey(item);
                });
            },
        });
    }

    filterEmployee() {
        this.formFilter.get('WorkShiftId')?.setValue(this.formFilter.get('WorkShiftId')?.value === null ? '' : this.formFilter.get('WorkShiftId')?.value);
        this.formFilter.get('Gender')?.setValue(this.formFilter.get('Gender')?.value === null ? '' : this.formFilter.get('Gender')?.value);
        this._employeeService.filterEmployee(this.formFilter.value).subscribe({
            next: (res: any) => {
                this.employees = res.data as Employee[];
                if (this.employees.length === 0) {
                    this._toastService.showWarningNoKey(MESSAGE_TITLE.LIST_EMPTY);
                }
            }, error: (error) => {
                error.error.messages.forEach((item: string) => {
                    this._toastService.showErrorNoKey(item);
                });
            }
        })
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
                    this.onInitApi();
                    this.deleteProductsDialog = false;
                    this.employee = {};
                },
                error: (error) => {
                    console.log(error)
                    this._toastService.showErrorNoKey(MESSAGE_TITLE.DELETE_ERR);
                },
            });
        }
    }

    initFormFilter() {
        this.formFilter = this._fb.group({
            WorkShiftId: [''],
            Gender: [''],
        });
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
                    this._toastService.showErrorNoKey(MESSAGE_TITLE.RESET_PASS_ERR);
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
}
