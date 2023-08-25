import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FilterHelper } from 'src/app/core/helpers/filter.helper';
import { Workshift } from 'src/app/demo/api/work-shift';
import { EmployeeService, MESSAGE_TITLE_VN, ROUTER } from 'src/app/shared';
import { Genders } from 'src/app/shared/constants/gender';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { UploadService } from 'src/app/shared/services/upload.service';
import { WorkShiftService } from 'src/app/shared/services/work-shift.service';
const MESSAGE_WARNING = {
    REQUIRED_VALIDATION: 'Kiểm tra lại thông tin các trường bắt buộc nhập (*)',
    EMAIL_EXISTS: ' đã tồn tại'
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
    birthdayInit!: Date | null;
    defaultGender!: boolean;
    imageDisplay: string = '';
    workShifts: Workshift[] = [];
    fileUrl: string = '';
    idEmployeeInit: number = 0;
    keyToast = 'bc';
    fileUpload: any;
    resetPassDialog: boolean = false;
    loading: boolean = false;
    checkValidInput: boolean = false;

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
    ) { }

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
                    this._toastService.showWarningNoKey(MESSAGE_TITLE_VN.LIST_EMPTY);
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
        const name = /^[A-Za-zÀ-ỹ]+(?: [A-Za-zÀ-ỹ]+)*$/;
        const phone = /^(03|09)\d{8}$/;
        const email = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        this.form = this._fb.group({
            id: [''],
            name: ['', Validators.compose([Validators.required, Validators.maxLength(100), Validators.pattern(name)])],
            gender: [null],
            birthday: [''],
            phoneNumber: ['', Validators.compose([Validators.required, Validators.pattern(phone)])],
            address: ['', Validators.maxLength(500)],
            email: ['', Validators.compose([Validators.required, Validators.pattern(email), Validators.maxLength(100)])],
            image: [''],
            workShiftId: [0, Validators.compose([Validators.required])],
            userName: [''],
        });
    }

    getEmployeeById() {
        this._activatedRoute.paramMap.subscribe((next) => {
            const id = next.get('id');
            if (id) {
                this._employeeService.getEmployeeById(id).subscribe({
                    next: (res) => {
                        this.form.patchValue(res);
                        this.idEmployeeInit = this.form.get('id')?.value;
                        this.defaultGender = this.form.get('gender')?.value;
                        this.birthdayInit = res.birthday ? new Date(res.birthday) : this.birthdayInit;
                        this.fileUrl = res.imageLink;
                        this.form.patchValue({
                            image: res.image,
                        });
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

    showErrorWhenEdit(error: any) {
        if (error.error.messages == 'Email already exists in the database.') {
            this._toastService.showError(this.form.get('email')?.value + MESSAGE_WARNING.EMAIL_EXISTS, this.keyToast);
        }
        else if (error.error.messages) {
            error.error.messages.forEach((item: string) => {
                this._toastService.showError(item, this.keyToast);
            });
        }
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
            this.loading = true;
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
                                this.buttonLoading();
                            },
                            error: (error) => {
                                this.loading = false;
                                if (!this.birthdayInit) {
                                    this.birthdayInit = null;
                                } else {
                                    this.birthdayInit = new Date(this.birthdayInit);
                                }
                                this.showErrorWhenEdit(error);
                            },
                        });
                    },
                    error: (error) => {
                        this.loading = false;
                        error.error.Messages.forEach((item: string) => {
                            this._toastService.showError(item, this.keyToast);
                        });
                    },
                });
            }
            if (!this.fileUpload) {
                this._employeeService.updateEmployeeById(this.form.value).subscribe({
                    next: (res) => {
                        this.buttonLoading();
                    },
                    error: (error) => {
                        this.loading = false;
                        if (!this.birthdayInit) {
                            this.birthdayInit = null;
                        } else {
                            this.birthdayInit = new Date(this.birthdayInit);
                        }
                        this.showErrorWhenEdit(error);
                    },
                });
            }
        } else {
            this.checkValidInput = true;
        }
    }

    removeImage() {
        const formData = new FormData();
        formData.append('filePath', this.form.get('image')?.value);
        this._uploadService.deleteImage(formData).subscribe({
            next: (res) => {
                this.form.patchValue({
                    image: '',
                });
                this.imageDisplay = '';
            },
            error: (error) => {
                if (error.error.messages) {
                    error.error.messages.forEach((item: string) => {
                        this._toastService.showError(item, this.keyToast);
                    });
                } else {
                    this._toastService.showError(MESSAGE_TITLE_VN.DELETE_SUCC, this.keyToast);
                }
            },
        });
    }

    resetConfirmed() {
        if (this.form.get('userName')?.value) {
            this._employeeService.resetPasswordEmployee(this.form.get('userName')?.value).subscribe({
                next: () => {
                    this._toastService.showSuccess(MESSAGE_TITLE_VN.RESET_PASS_SUCC, this.keyToast);
                    this.resetPassDialog = false;
                },
                error: (error) => {
                    if (error.error.messages) {
                        error.error.messages.forEach((item: string) => {
                            this._toastService.showErrorNoKey(item);
                        });
                    }
                    else {
                        this._toastService.showErrorNoKey(MESSAGE_TITLE_VN.RESET_PASS_ERR);
                    }
                },
            });
        }
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

    buttonLoading() {
        setTimeout(() => {
            this._notificationService.addMessage(MESSAGE_TITLE_VN.EDIT_SUCC);
            this.navigateBackEmployeeList();
            this.loading = false
        }, 500);
    }
}