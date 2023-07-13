import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MESSAGE_TITLE } from 'src/app/shared';
import { EmployeeService } from 'src/app/shared';
import { MessageService } from 'primeng/api';
import { Validators } from '@angular/forms';
import { EmployeeUpdate } from 'src/app/demo/api/employee';
import { Genders } from 'src/app/shared/constants/gender';
import { UploadEvent } from 'src/app/demo/api/employee';
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
    genderInit!: boolean;
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
                    next: (data) => {
                        this.form.patchValue(data);
                        this.defaultGender = this.form.get('gender')?.value;
                        this.birthdayInit = new Date(data.birthday);
                        this.imageDisplay = data.image;
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
        this.form.get('birthday')?.value && this.convertBirthdayFormat();
        this.form.patchValue({
            gender: this.form.get('gender')?.value ?? '',
            address: this.form.get('address')?.value ?? ' ',
        });
        console.log(this.form.value);
        const formData = new FormData();
        Object.keys(this.form.controls).forEach((key) => {
            const control = this.form.get(key);
            if (control) {
                formData.append(key, control.value);
            }
        });

        this._employeeService.updateEmployeeById(formData as EmployeeUpdate).subscribe(
            (next) => {
                this.navigateBackEmployeeList();
                this._messageService.add({ severity: MESSAGE_TITLE.SUCCESS, summary: 'Successful', detail: MESSAGE_TITLE.EDIT_SUCC, life: 3000 });
            },
            (error) => {
                // error.error.Messages.forEach((item: string) => {
                //     this._messageService.add({ severity: 'error', summary: 'Error', detail: item, life: 3000 });
                // });
                console.log(error);
            }
        );
    }

    setImageDefault() {
        this.imageDisplay = '';
        this.form.patchValue({
            imageFile: ' ',
        });
    }
}
