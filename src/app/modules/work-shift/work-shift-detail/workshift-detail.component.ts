import { Component } from '@angular/core';
import { Table } from 'primeng/table';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkShiftService } from 'src/app/shared/services/work-shift.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { Employee } from 'src/app/demo/api/employee';
import { MessageService } from 'primeng/api';
import { EmployeeService } from 'src/app/shared';
import { ROUTER } from 'src/app/shared';
import { MESSAGE_TITLE } from 'src/app/shared';
import { Workshift } from 'src/app/demo/api/work-shift';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NotificationService } from 'src/app/shared/services/notification.service';
const MESSAGE_WARNING = {
    EMPTY_LIST_EMPLOYEE: 'Danh sách nhân viên của ca làm việc này trống',
};

@Component({
    selector: 'app-workshift-detail',
    templateUrl: './workshift-detail.component.html',
    styleUrls: ['./workshift-detail.component.scss'],
    providers: [MessageService, ToastService],
})
export class WorkshiftDetailComponent {
    form!: FormGroup;
    isSkeleton: boolean = true;
    employees: Employee[] = [];
    nameWorkshift: any = '';
    selectedObjects: number[] = [];
    workshifts: Workshift[] = [];
    visible: boolean = false;
    idParam: any = 0

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _workshiftService: WorkShiftService,
        private _toastService: ToastService,
        private _employeeService: EmployeeService,
        private _router: Router,
        private _fb: FormBuilder,
        private _notificationService: NotificationService
    ) { }

    ngOnInit() {
        this.getListEmployeeByIdWorkshift();
        this.loadSkeletonTable();
        this.getListWorkShift();
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    getListEmployeeByIdWorkshift() {
        this._activatedRoute.paramMap.subscribe((next) => {
            this.idParam = next.get('id');
            this.nameWorkshift = next.get('nameWorkshift');
            if (this.idParam) {
                this._employeeService.getListDetailWorkshift(+this.idParam, 'WorkShiftId').subscribe({
                    next: (res) => {
                        if (res.data && res.data?.length > 0) {
                            this.employees = res.data as Employee[];
                        } else {
                            this._toastService.showWarningNoKey(MESSAGE_WARNING.EMPTY_LIST_EMPLOYEE);
                        }
                    },
                    error: (error) => {
                        error.error.Messages.forEach((item: string) => {
                            this._toastService.showErrorNoKey(item);
                        });
                    },
                });
            }
        });
    }

    getListWorkShift() {
        this._workshiftService.getListWorkShift().subscribe({
            next: (res: any) => {
                this.workshifts = res.data.filter((workshift: Workshift) => workshift.id != this.idParam);
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

    changeWorkshiftByIdEmployee(id: number) {
        this.form.patchValue({
            listId: this.selectedObjects,
            workShiftId: id
        })
        this._employeeService.changeWorkshiftByIdEmployee(this.form.value).subscribe({
            next: (res) => {
                this._notificationService.addMessage(MESSAGE_TITLE.CHANGE);
                this.navigateBackToListWorkshift();
            }, error: (error) => {
                this._notificationService.addMessage(MESSAGE_TITLE.CHANGE);
            }
        })
    }

    navigateBackToListWorkshift() {
        this._router.navigate([ROUTER.LIST_WORK_SHIFT]);
    }

    loadSkeletonTable() {
        setTimeout(() => {
            this.isSkeleton = false;
        }, 1000);
    }

    toggleAllChecked() {
        if (this.selectedObjects.length === this.employees.length) {
            this.selectedObjects = [];
        } else {
            this.selectedObjects = this.employees.map(obj => obj.id) as number[];
        }
    }

    toggleObject(id: number) {
        const index = this.selectedObjects.indexOf(id);
        if (index !== -1) {
            this.selectedObjects.splice(index, 1);
        } else {
            this.selectedObjects.push(id);
        }
    }

    isSelected(id: number): boolean {
        return this.selectedObjects.indexOf(id) !== -1;
    }

    showDialog() {
        this.visible = true;
        this.formChangeWorkshift();
    }

    formChangeWorkshift() {
        this.form = this._fb.group({
            listId: [[]],
            workShiftId: [''],
        });
    }

}
