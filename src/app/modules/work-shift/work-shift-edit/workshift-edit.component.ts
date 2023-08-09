import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ROUTER } from 'src/app/shared';
import { MessageService } from 'primeng/api';
import { ToastService } from 'src/app/shared/services/toast.service';
import { WORKDAY } from 'src/app/shared/constants/workday';
import { WorkShiftService } from 'src/app/shared/services/work-shift.service';
import { MESSAGE_TITLE } from 'src/app/shared';
import { Workshift } from 'src/app/demo/api/work-shift';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
    selector: 'app-workshift-edit',
    templateUrl: './workshift-edit.component.html',
    styleUrls: ['./workshift-edit.component.scss'],
    providers: [MessageService, ToastService]
})
export class WorkshiftEditComponent {
    form!: FormGroup;
    workshift: Workshift[] = [];
    workdays: any[] = WORKDAY;
    workdaySelected: number[] = [];
    submitted: boolean = false;
    formattedFromTime: string = '';
    formattedToTime: string = '';
    keyToast: string = 'bc';

    constructor(private _fb: FormBuilder,
        private _router: Router,
        private _workShiftService: WorkShiftService,
        private _toastService: ToastService,
        private _activatedRoute: ActivatedRoute,
        private notificationService: NotificationService) {

    }

    ngOnInit() {
        this.initFormCreateWorkshift();
        this.getWorkshiftById();
    }
    initFormCreateWorkshift() {
        this.form = this._fb.group({
            id: [''],
            name: ['', Validators.compose([Validators.required])],
            fromTime: ['', Validators.compose([Validators.required])],
            toTime: ['', Validators.compose([Validators.required])],
            isDefault: [false],
            description: ['', Validators.compose([Validators.required, Validators.maxLength(255)])],
            workDays: [[]],
        });
    }

    updateWorkshiftById() {
        if (this.form.valid && this.workdaySelected.length) {
            this.convertDataBeforeCreate();
            this._workShiftService.updateWorkshiftById(this.form.value).subscribe({
                next: (res) => {
                    this.notificationService.addMessage(MESSAGE_TITLE.EDIT_SUCC);
                    this.navigateBackToListWorkshift();
                },
                error: (error) => {
                    error.error.messages.forEach((item: string) => {
                        this._toastService.showError(item, this.keyToast);
                    });
                }
            })
        } else {
            this.submitted = true;
        }
    }

    getWorkshiftById() {
        this._activatedRoute.paramMap.subscribe((next) => {
            const idWorkshift = next.get('id');
            if (idWorkshift) {
                this._workShiftService.getWorkshiftById(idWorkshift.toString()).subscribe({
                    next: (res) => {
                        this.workshift = res as Workshift[];
                        this.form.patchValue(this.workshift);
                    }, error: (error) => {
                        error.error.messages.forEach((item: string) => {
                            this._toastService.showError(item, this.keyToast);
                        });
                    }
                })
            }
        })
    }

    convertDataBeforeCreate() {
        this.formattedFromTime = this.form.get('fromTime')?.value;
        this.formattedToTime = this.form.get('toTime')?.value;
        if (this.isDateFormatValid(this.formattedFromTime)) {
            const fromDate = new Date(this.form.get('fromTime')?.value);
            this.formattedFromTime = `${fromDate.getHours().toString().padStart(2, '0')}:${fromDate.getMinutes().toString().padStart(2, '0')}`;
        } if (this.isDateFormatValid(this.formattedToTime)) {
            const toDate = new Date(this.form.get('toTime')?.value);
            this.formattedToTime = `${toDate.getHours().toString().padStart(2, '0')}:${toDate.getMinutes().toString().padStart(2, '0')}`;
        }
        this.form.patchValue({
            fromTime: this.formattedFromTime,
            toTime: this.formattedToTime,
            workDays: this.form.get('workDays')?.value,
        })
    }

    isDateFormatValid(dateString: string) {
        const dateFormatRegex = /^[A-Z][a-z]{2}\s[A-Z][a-z]{2}\s\d{2}\s\d{4}\s\d{2}:\d{2}:\d{2}\sGMT[+-]\d{4}\s\([^)]+\)$/;
        return dateFormatRegex.test(dateString);
    }


    toggleObject(id: number): void {
        this.workdaySelected = this.form.get('workDays') ? this.form.get('workDays')?.value : [];
        if (this.isSelected(id)) {
            const index = this.workdaySelected.indexOf(id);
            if (index >= 0) {
                this.workdaySelected.splice(index, 1);
            }
        } else {
            this.workdaySelected.push(id);
        }
    }

    isSelected(id: number): boolean {
        return this.form.value.workDays.includes(id);
    }


    isSelectedAnyWorkday(): boolean {
        return this.workdaySelected.length > 0;
    }

    navigateBackToListWorkshift() {
        this._router.navigate([ROUTER.LIST_WORK_SHIFT]);
    }

}