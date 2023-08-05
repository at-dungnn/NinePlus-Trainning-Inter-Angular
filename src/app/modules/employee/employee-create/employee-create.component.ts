import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { EmployeeService } from 'src/app/shared';
import { MessageService } from 'primeng/api';
import { MESSAGE_TITLE } from 'src/app/shared';
import { Genders } from 'src/app/shared/constants/gender';
import { ToastService } from 'src/app/shared/services/toast.service';
import { ROUTER } from 'src/app/shared';
import { UploadService } from 'src/app/shared/services/upload.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
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
    fileUrl: string = ''

    constructor(
        private _router: Router,
        private _employeeService: EmployeeService,
        private _messageService: MessageService,
        private _fb: FormBuilder,
        private _toastService: ToastService,
        private _uploadService: UploadService,
        private _notificationService: NotificationService,
    ) { }

    ngOnInit() {
        this.initFormCreateEmployee();
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
            image: [null],
            username: ['', Validators.compose([Validators.required])],
            password: ['', Validators.compose([Validators.required, Validators.pattern(password)])],
            workShiftId: [0, Validators.compose([Validators.required])],
        });
    }

    onFileSelect(event: any): void {
        const formData = new FormData();
        formData.append("file", event.files[0]);
        formData.append("filePath", event.files[0].name);
        this._uploadService.upLoadFile(formData).subscribe({
            next: (res: any) => {
                console.log(res.data);
                console.log(res.data.filePath);
                console.log(res.data.fileUrl);
                this.form.patchValue({
                    image: res.data.filePath
                })
                this.fileUrl = res.data.fileUrl;
            }, error: (error) => {
                error.error.Messages.forEach((item: string) => {
                    this._toastService.showError(item, this.keyToast);
                });
            }
        })
    }

    createEmployee() {
        if (this.form.valid) {
            if (this.form.get('birthday')?.value) {
                this.form.patchValue({
                    birthday: this.form.get('birthday')?.value.toISOString(),
                });
            }
            this._employeeService.createEmployee(this.form.value).subscribe({
                next: (res) => {
                    this._notificationService.addMessage(MESSAGE_TITLE.ADD_SUCC);
                    this.navigateBackEmployeeList();
                },
                error: (error) => {
                    console.log(error)
                    this.form.patchValue({ birthday: new Date(this.form.get('birthday')?.value) });
                    if (error.error.messages) {
                        error.error.messages.forEach((item: string) => {
                            this._toastService.showError(item, this.keyToast);
                        });
                    } else {
                        error.error.Messages.forEach((item: string) => {
                            this._toastService.showError(item, this.keyToast);
                        });
                    }
                }
            });
        } else {
            this._toastService.showError(MESSAGE_WARNING.REQUIRED_VALIDATION, this.keyToast);
        }
    }

    navigateBackEmployeeList() {
        this._router.navigate([ROUTER.LIST_EMPLOYEE]);
    }

}
