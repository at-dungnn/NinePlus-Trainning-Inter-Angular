import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MESSAGE_TITLE } from 'src/app/shared';
import { EmployeeService } from 'src/app/shared';
import { MessageService } from 'primeng/api';
import { Validators } from '@angular/forms';
import { EmployeeCreateAndUpdate } from 'src/app/demo/api/employee';
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
    employee: EmployeeCreateAndUpdate = {};
    birthdayInit!: Date;

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
        const uppercaseFirstName = /^[A-Z][a-zA-Z]*$/;
        const phone = /^(?:\+?84|0)(?:\d{9,10})$/;
        const email = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const password = /^.{8,}$/;
        this.form = this._fb.group({
            id: [0],
            name: ['', Validators.compose([Validators.required])],
            gender: [''],
            birthday: [''],
            phoneNumber: ['', Validators.compose([Validators.required, Validators.pattern(phone)])],
            address: [''],
            email: ['', Validators.compose([Validators.required, Validators.pattern(email)])],
            imageFile: [''],
            username: ['', Validators.compose([Validators.required])],
            password: ['', Validators.compose([Validators.required, Validators.pattern(password)])],
            workShiftId: [0, Validators.compose([Validators.required])],
        });
    }
    onFileSelect(event: any): void {
        this.form.get('imageFile')?.setValue(event.files[0]);
    }

    navigateBackEmployeeList() {
        this._router.navigate(['manage-employee/list']);
    }

    getEmployeeById() {
        this._activatedRoute.paramMap.subscribe((next) => {
            const id = next.get('id');
            if (id) {
                this._employeeService.getByIdBackEnd(id).subscribe(
                    (next) => {
                        this.form.patchValue(next.data);
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
        this.form.patchValue({
            birthday: this.birthdayInit.toISOString(),
        });
        const formData = new FormData();
        Object.keys(this.form.controls).forEach((key) => {
            const control = this.form.get(key);
            if (control) {
                formData.append(key, control.value);
            }
        });
        this._employeeService.updateById(this.form.value).subscribe(
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
}
