import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MESSAGE_TITLE } from 'src/app/shared';
import { EmployeeService } from 'src/app/shared';
import { MessageService } from 'primeng/api';
import { Validators } from '@angular/forms';
import { EmployeeUpdate } from 'src/app/demo/api/employee';
import { Genders } from 'src/app/shared/constants/gender';
import { ROUTER } from 'src/app/shared';
import { ToastService } from 'src/app/shared/services/toast.service';
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
    keyToast: string = 'bc';
    constructor(
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _employeeService: EmployeeService,
        private _messageService: MessageService,
        private _fb: FormBuilder,
        private _toastService: ToastService
    ) {}

    ngOnInit() {
        this.getEmployeeById();
        this.initFormUpdateEmployee();
    }

    initFormUpdateEmployee() {
        const phone = /^(?:\+?84|0)(?:\d{9,10})$/;
        const email = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        this.form = this._fb.group({
            id: [{ value: '', disabled: true }],
            name: ['', Validators.compose([Validators.required])],
            gender: [''],
            birthday: [''],
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
                        this.defaultGender = this.form.get('gender')?.value;
                        this.birthdayInit = new Date(res.birthday);
                        this.imageDisplay = res.image;
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
        const reader = new FileReader();
        const file = event.files[0];
        reader.onload = (e: any) => {
            this.imageDisplay = e.target.result;
        };
        reader.readAsDataURL(file);
        this.form.get('imageFile')?.setValue(event.files[0]);
    }

    updateEmployeeById() {
        if (this.form.valid) {
            this.convertDataBeforeUpdate();
            const formData = new FormData();
            Object.keys(this.form.controls).forEach((key) => {
                const control = this.form.get(key);
                if (control) {
                    formData.append(key, control.value);
                }
            });
            this._employeeService.updateEmployeeById(formData as EmployeeUpdate).subscribe({
                next: (res) => {
                    this.navigateBackEmployeeList();
                    this._toastService.showSuccess(MESSAGE_TITLE.EDIT_SUCC, this.keyToast);
                },
                error: (error) => {
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
    }

    setImageDefault() {
        this.imageDisplay = '';
        this.form.patchValue({
            imageFile: '',
        });
    }

    navigateBackEmployeeList() {
        this._router.navigate([ROUTER.LIST_EMPLOYEE]);
    }

    convertDataBeforeUpdate() {
        const birthdayPattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/;
        if (!birthdayPattern.test(this.form.get('birthday')?.value)) this.convertBirthdayFormat();
        this.form.patchValue({
            gender: this.form.get('gender')?.value ?? '',
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
