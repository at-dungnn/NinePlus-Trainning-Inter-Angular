import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ROUTER } from 'src/app/shared';
import { MessageService } from 'primeng/api';
import { ToastService } from 'src/app/shared/services/toast.service';
import { WORKDAY } from 'src/app/shared/constants/workday';
import { WorkShiftService } from 'src/app/shared/services/work-shift.service';
import { MESSAGE_TITLE } from 'src/app/shared';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-workshift-create',
  templateUrl: './workshift-create.component.html',
  styleUrls: ['./workshift-create.component.scss'],
  providers: [MessageService, ToastService]
})
export class WorkshiftCreateComponent {
  form!: FormGroup;
  workdays: any[] = WORKDAY;
  workdaySelected: number[] = [];
  submitted: boolean = false;
  keyToast: string = 'bc';

  constructor(private _fb: FormBuilder,
    private _router: Router,
    private _workShiftService: WorkShiftService,
    private _toastService: ToastService,
    private _notificationService: NotificationService) { }

  ngOnInit() {
    this.initFormCreateWorkshift();
  }
  initFormCreateWorkshift() {
    this.form = this._fb.group({
      name: ['', Validators.compose([Validators.required])],
      fromTime: ['', Validators.compose([Validators.required])],
      toTime: ['', Validators.compose([Validators.required])],
      isDefault: [false],
      description: ['', Validators.compose([Validators.required, Validators.maxLength(255)])],
      workDays: [[]],
    });
  }

  createWorkshoft() {
    if (this.form.valid) {
      this.convertDataBeforeCreate();
      this._workShiftService.createWorkshift(this.form.value).subscribe({
        next: (res) => {
          this._notificationService.addMessage(MESSAGE_TITLE.ADD_SUCC);
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

  convertDataBeforeCreate() {
    const fromDate = new Date(this.form.get('fromTime')?.value);
    const toDate = new Date(this.form.get('toTime')?.value);
    const formattedFromTime = `${fromDate.getHours().toString().padStart(2, '0')}:${fromDate.getMinutes().toString().padStart(2, '0')}`;
    const formattedToTime = `${toDate.getHours().toString().padStart(2, '0')}:${toDate.getMinutes().toString().padStart(2, '0')}`;
    this.form.patchValue({
      fromTime: formattedFromTime,
      toTime: formattedToTime,
      workDays: this.workdaySelected,
    })
  }

  toggleObject(id: number) {
    const index = this.workdaySelected.indexOf(id);
    if (index !== -1) {
      this.workdaySelected.splice(index, 1);
    } else {
      this.workdaySelected.push(id);
    }
  }

  isSelected(id: number): boolean {
    return this.workdaySelected.indexOf(id) !== -1;
  }

  isSelectedAnyWorkday(): boolean {
    return this.workdaySelected.length > 0;
  }

  navigateBackToListWorkshift() {
    this._router.navigate([ROUTER.LIST_WORK_SHIFT]);
  }

}