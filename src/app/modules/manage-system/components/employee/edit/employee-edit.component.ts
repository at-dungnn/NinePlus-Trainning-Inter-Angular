import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MESSAGE_TITLE } from 'src/app/shared';
import { EmployeeService } from 'src/app/shared';
import { MessageService } from 'primeng/api';
import { Validators } from '@angular/forms';
import { EmployeeUpdate } from 'src/app/demo/api/employee';
import { Genders } from 'src/app/shared/constants/gender';

@Component({
    selector: 'app-employee-edit',
    templateUrl: './employee-edit.component.html',
    styleUrls: ['./employee-edit.component.scss'],
    providers: [MessageService],
})
export class EmployeeEditComponent {
    genders: any[] = Genders;
    isDisabled: boolean = false;
    form!: FormGroup;
    birthdayInit!: Date;
    defaultGender!: boolean;
    constructor(
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _employeeService: EmployeeService,
        private _messageService: MessageService,
        private _fb: FormBuilder
    ) {}

    ngOnInit() {
        this.getEmployeeById();
        this.initFormUpdateEmployee();
    }

    initFormUpdateEmployee() {
        const phone = /^(?:\+?84|0)(?:\d{9,10})$/;
        const email = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        this.form = this._fb.group({
            id: [''],
            name: ['', Validators.compose([Validators.required])],
            gender: [''],
            birthday: [''],
            phoneNumber: ['', Validators.compose([Validators.required, Validators.pattern(phone)])],
            address: [''],
            email: ['', Validators.compose([Validators.required, Validators.pattern(email)])],
            image: [''],
            workShiftId: [0, Validators.compose([Validators.required])],
        });
    }
    onFileSelect(event: any): void {
        this.form.get('image')?.setValue(event.files[0]);
    }

    getEmployeeById() {
        this._activatedRoute.paramMap.subscribe((next) => {
            const id = next.get('id');
            if (id) {
                this._employeeService.getEmployeeById(id).subscribe(
                    (next) => {
                        this.form.patchValue(next.data);
                        this.defaultGender = this.form.get('gender')?.value;
                        this.birthdayInit = new Date(next.data.birthday);
                    },
                    (error) => {
                        error.error.Messages.forEach((item: string) => {
                            this._messageService.add({ severity: 'error', summary: 'Error', detail: item, life: 3000 });
                        });
                    }
                );
            }
        });
    }

    updateEmployeeById() {
        this.form.get('birthday')?.value && this.convertBirthdayFormat();
        this.form.get('gender')?.value === null && this.form.patchValue({ gender: '' });
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
                error.error.Messages.forEach((item: string) => {
                    this._messageService.add({ severity: 'error', summary: 'Error', detail: item, life: 3000 });
                });
            }
        );
    }

    navigateBackEmployeeList() {
        this._router.navigate(['manage-employee/list']);
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
