import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MESSAGE_TITLE } from 'src/app/shared';
import { EmployeeService } from 'src/app/shared';
import { MessageService } from 'primeng/api';
import { Validators } from '@angular/forms';
import { Genders } from 'src/app/shared/constants/gender';
import { ROUTER } from 'src/app/shared';
import { ToastService } from 'src/app/shared/services/toast.service';
import { Workshift } from 'src/app/demo/api/work-shift';
import { UploadService } from 'src/app/shared/services/upload.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
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

    constructor(
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _employeeService: EmployeeService,
        private _messageService: MessageService,
        private _fb: FormBuilder,
        private _toastService: ToastService,
        private _uploadService: UploadService,
        private _notificationService: NotificationService,
    ) { }

    ngOnInit() {
        this.getEmployeeById();
        this.initFormUpdateEmployee();
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
            imageFile: [''],
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
                        this.imageDisplay = res.imageLink;
                        this.form.patchValue({
                            imageFile: res.image
                        })
                        console.log(this.form.get('imageFile')?.value)
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

    onFileSelect(event: any): void {
        const formData = new FormData();
        formData.append("file", event.files[0]);
        formData.append("filePath", event.files[0].name);
        this._uploadService.upLoadFile(formData).subscribe({
            next: (res: any) => {
                this.form.patchValue({
                    imageFile: res.data.filePath
                })
                this.imageDisplay = res.data.fileUrl;
                console.log(this.form.value)
                console.log(this.form.get('imageFile')?.value)
            }, error: (error) => {
                error.error.Messages.forEach((item: string) => {
                    this._toastService.showError(item, this.keyToast);
                });
            }
        })
    }

    updateEmployeeById() {
        if (this.form.valid) {
            if (this.form.get('birthday')?.value) {
                this.convertDataBeforeUpdate();
            }
            console.log(this.form.value)
            this._employeeService.updateEmployeeById(this.form.value).subscribe({
                next: (res) => {
                    this._notificationService.addMessage(MESSAGE_TITLE.EDIT_SUCC);
                    this.navigateBackEmployeeList();
                },
                error: (error) => {
                    console.log(error)
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
        } else {
            this._toastService.showError(MESSAGE_WARNING.REQUIRED_VALIDATION, this.keyToast);
        }
    }

    removeImage() {
        const formData = new FormData();
        // console.log(this.form.get('imageFile')?.value.replace(/\\/g, '\\\\'))
        formData.append("filePath", this.form.get('imageFile')?.value);
        for (const value of formData.values()) {
            console.log(value);
        }
        this._uploadService.deleteImage(formData).subscribe({
            next: (res) => {
                this.form.patchValue({
                    imageFile: '',
                })
                this.imageDisplay = '';
            }, error: (error) => {
                this._toastService.showErrorNoKey('Xoá lỗi');
            }
        })
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
}
