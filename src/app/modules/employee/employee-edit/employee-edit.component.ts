import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
    selector: 'app-employee-edit',
    templateUrl: './employee-edit.component.html',
    styleUrls: ['./employee-edit.component.scss'],
    providers: [MessageService, ToastService],
})
export class EmployeeEditComponent {
    genders: any[] = Genders;
    form!: FormGroup;
    birthdayInit!: Date;
    defaultGender!: boolean;
    imageDisplay: string = '';
    workShifts: Workshift[] = [];
    fileUrl: string = '';
    idEmployeeInit: number = 0;
    keyToast = 'bc';
    fileUpload: any;
    constructor(
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
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
        this.getEmployeeById();
        this.initFormUpdateEmployee();
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
    initFormUpdateEmployee() {
        const phone = /^(?:\+?84|0)(?:\d{9})$/;
        const email = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        this.form = this._fb.group({
            id: [''],
            name: ['', Validators.compose([Validators.required])],
            gender: [null],
            birthday: [null],
            phoneNumber: ['', Validators.compose([Validators.required, Validators.pattern(phone)])],
            address: [''],
            email: ['', Validators.compose([Validators.required, Validators.pattern(email)])],
            image: [''],
            workShiftId: [0, Validators.compose([Validators.required])],
        });
    }

    getEmployeeById() {
        this._activatedRoute.paramMap.subscribe((next) => {
            const id = next.get('id');
            if (id) {
                this._employeeService.getEmployeeById(id).subscribe({
                    next: (res) => {
                        this.form.patchValue(res);
                        console.log(res);
                        this.idEmployeeInit = this.form.get('id')?.value;
                        this.defaultGender = this.form.get('gender')?.value;
                        this.birthdayInit = res.birthday ? new Date(res.birthday) : this.birthdayInit;
                        this.fileUrl = res.imageLink;
                        this.form.patchValue({
                            image: res.image,
                        });
                        console.log(this.form.get('image')?.value);
                    },
                    error: (error) => {
                        error.error.Messages.forEach((item: string) => {
                            this._toastService.showError(item, this.keyToast);
                        });
                    },
                });
            }
        });
    }
    uploadFile(event: any): void {
        this.fileUpload = event.target.files[0];
        this.getBase64(event.target.files[0]);
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
                this.imageDisplay = res.data.fileUrl;
                console.log(this.form.value);
                console.log(this.form.get('image')?.value);
            },
            error: (error) => {
                error.error.Messages.forEach((item: string) => {
                    this._toastService.showError(item, this.keyToast);
                });
            },
        });
    }

    updateEmployeeById() {
        if (this.form.valid) {
            if (this.form.get('birthday')?.value) {
                this.convertDataBeforeUpdate();
            }
            let param = FilterHelper.removeNullValue(this.form.value);
            if (this.fileUpload) {
                const formData = new FormData();
                formData.append('file', this.fileUpload);
                formData.append('filePath', 'employee');
                this._uploadService.upLoadFile(formData).subscribe({
                    next: (res: any) => {
                        this.form.patchValue({
                            image: res.data.filePath,
                        });
                        param.image = res.data.filePath;
                        this.fileUrl = res.data.fileUrl;
                        this._employeeService.updateEmployeeById(param).subscribe({
                            next: (res) => {
                                this._notificationService.addMessage(MESSAGE_TITLE.EDIT_SUCC);
                                this.navigateBackEmployeeList();
                            },
                            error: (error) => {
                                this.birthdayInit = new Date(this.birthdayInit);
                                if (error.error.messages) {
                                    error.error.messages.forEach((item: string) => {
                                        this._toastService.showError(item, this.keyToast);
                                    });
                                } else {
                                    error.error.Messages.forEach((item: string) => {
                                        this._toastService.showError(item, this.keyToast);
                                    });
                                }
                            },
                        });
                    },
                    error: (error) => {
                        error.error.Messages.forEach((item: string) => {
                            this._toastService.showErrorNoKey(item);
                        });
                    },
                });
            }
            if (!this.fileUpload) {
                this._employeeService.updateEmployeeById(this.form.value).subscribe({
                    next: (res) => {
                        this._notificationService.addMessage(MESSAGE_TITLE.EDIT_SUCC);
                        this.navigateBackEmployeeList();
                    },
                    error: (error) => {
                        console.log(error);
                        this.birthdayInit = new Date(this.birthdayInit);
                        if (error.error.messages) {
                            error.error.messages.forEach((item: string) => {
                                this._toastService.showError(item, this.keyToast);
                            });
                        } else {
                            error.error.Messages.forEach((item: string) => {
                                this._toastService.showError(item, this.keyToast);
                            });
                        }
                    },
                });
            }
        } else {
            this._toastService.showError(MESSAGE_WARNING.REQUIRED_VALIDATION, this.keyToast);
        }
    }

    removeImage() {
        const formData = new FormData();
        // console.log(this.form.get('imageFile')?.value.replace(/\\/g, '\\\\'))
        formData.append('filePath', this.form.get('image')?.value);
        for (const value of formData.values()) {
            console.log(value);
        }
        this._uploadService.deleteImage(formData).subscribe({
            next: (res) => {
                this.form.patchValue({
                    image: '',
                });
                this.imageDisplay = '';
            },
            error: (error) => {
                this._toastService.showErrorNoKey('Xoá lỗi');
            },
        });
    }

    navigateBackEmployeeList() {
        this._router.navigate([ROUTER.LIST_EMPLOYEE]);
    }

    convertDataBeforeUpdate() {
        const birthdayPattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/;
        if (!birthdayPattern.test(this.form.get('birthday')?.value)) this.convertBirthdayFormat();
        this.form.patchValue({
            address: this.form.get('address')?.value ?? ' ',
        });
    }

    convertBirthdayFormat() {
        const originalDate = new Date(this.form.get('birthday')?.value);
        const year = originalDate.getFullYear();
        const month = String(originalDate.getMonth() + 1).padStart(2, '0');
        const day = String(originalDate.getDate()).padStart(2, '0');
        const hours = String(originalDate.getHours()).padStart(2, '0');
        const minutes = String(originalDate.getMinutes()).padStart(2, '0');
        const seconds = String(originalDate.getSeconds()).padStart(2, '0');
        this.form.patchValue({
            birthday: `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`,
        });
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