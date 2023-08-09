import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FilterHelper } from 'src/app/core/helpers/filter.helper';
import { Workshift } from 'src/app/demo/api/work-shift';
import { EmployeeService, MESSAGE_TITLE, ROUTER } from 'src/app/shared';
import { Genders } from 'src/app/shared/constants/gender';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { UploadService } from 'src/app/shared/services/upload.service';
import { WorkShiftService } from 'src/app/shared/services/work-shift.service';
const MESSAGE_WARNING = {
    REQUIRED_VALIDATION: 'Kiểm tra lại thông tin các trường bắt buộc nhập (*)',
};
@Component({
    selector: 'app-employee-create',
    templateUrl: './employee-create.component.html',
    styleUrls: ['./employee-create.component.scss'],
    providers: [MessageService, ToastService],
})
export class EmployeeCreateComponent {
    genders: any[] = Genders;
    form!: FormGroup;
    formImage!: FormGroup;
    date: string = '';
    keyToast: string = 'bc';
    fileUrl: string = '';
    fileUpload: any;
    workShifts: Workshift[] = [];
    constructor(
        private _router: Router,
        private _employeeService: EmployeeService,
        private _messageService: MessageService,
        private _fb: FormBuilder,
        private _toastService: ToastService,
        private _uploadService: UploadService,
        private _notificationService: NotificationService,
        private _workShiftService: WorkShiftService
    ) {}

    ngOnInit() {
        this.getListWorkShift();
        this.initFormCreateEmployee();
    }
    getListWorkShift() {
        this._workShiftService.getListWorkShift().subscribe({
            next: (res) => {
                this.workShifts = res.data as Workshift[];
                if (this.workShifts.length === 0) {
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
    initFormCreateEmployee() {
        const phone = /^(?:\+?84|0)(?:\d{9})$/;
        const email = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const password = /^.{8,}$/;
        this.form = this._fb.group({
            name: ['', Validators.compose([Validators.required])],
            gender: [null],
            birthday: [null],
            phoneNumber: ['', Validators.compose([Validators.required, Validators.pattern(phone)])],
            address: [''],
            email: ['', Validators.compose([Validators.required, Validators.pattern(email)])],
            imageFile: [null],
            username: ['', Validators.compose([Validators.required])],
            password: ['', Validators.compose([Validators.required, Validators.pattern(password)])],
            workShiftId: ['', Validators.compose([Validators.required])],
        });
    }

    onFileSelect(event: any): void {
        const formData = new FormData();
        formData.append('file', event.files[0]);
        formData.append('filePath', event.files[0].name);
        this._uploadService.upLoadFile(formData).subscribe({
            next: (res: any) => {
                this.form.patchValue({
                    image: res.data.filePath,
                });
                this.fileUrl = res.data.fileUrl;
            },
            error: (error) => {
                error.error.Messages.forEach((item: string) => {
                    this._toastService.showError(item, this.keyToast);
                    this._toastService.showErrorNoKey(item);
                });
            },
        });
    }

    createEmployee() {
        if (this.form.valid) {
            if (this.form.get('birthday')?.value) {
                this.form.patchValue({
                    birthday: this.form.get('birthday')?.value.toISOString(),
                });
            }
            let param = FilterHelper.removeNullValue(this.form.value);
            if (this.fileUpload) {
                const formData = new FormData();
                formData.append('file', this.fileUpload);
                formData.append('filePath', 'employee');
                this._uploadService.upLoadFile(formData).subscribe({
                    next: (res: any) => {
                        this.form.patchValue({
                            imageFile: res.data.filePath,
                        });
                        param.image = res.data.filePath;
                        this._employeeService.createEmployee(param).subscribe({
                            next: (res) => {
                                this._notificationService.addMessage(MESSAGE_TITLE.ADD_SUCC);
                                this.navigateBackEmployeeList();
                            },
                            error: (error) => {
                                console.log(error);
                                this.form.patchValue({ birthday: new Date(this.form.get('birthday')?.value) });
                                if (error.error.messages) {
                                    error.error.messages.forEach((item: string) => {
                                        this._toastService.showErrorNoKey(item);
                                    });
                                } else {
                                    error.error.Messages.forEach((item: string) => {
                                        this._toastService.showErrorNoKey(item);
                                    });
                                }
                            },
                        });
                    },
                });
            }
            if (!this.fileUpload) {
                this._employeeService.createEmployee(this.form.value).subscribe({
                    next: (res) => {
                        this._notificationService.addMessage(MESSAGE_TITLE.ADD_SUCC);
                        this.navigateBackEmployeeList();
                    },
                    error: (error) => {
                        console.log(error);
                        this.form.patchValue({ birthday: new Date(this.form.get('birthday')?.value) });
                        if (error.error.messages) {
                            error.error.messages.forEach((item: string) => {
                                this._toastService.showErrorNoKey(item);
                            });
                        } else {
                            error.error.Messages.forEach((item: string) => {
                                this._toastService.showErrorNoKey(item);
                            });
                        }
                    },
                });
            }
        } else {
            this._toastService.showError(MESSAGE_WARNING.REQUIRED_VALIDATION, this.keyToast);
        }
    }

    navigateBackEmployeeList() {
        this._router.navigate([ROUTER.LIST_EMPLOYEE]);
    }
    uploadFile(event: any): void {
        this.fileUpload = event.target.files[0];
        this.getBase64(event.target.files[0]);
    }
    getBase64(file: any) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            this.fileUrl = reader.result as string;
            // this._detect.detectChanges();
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }
}