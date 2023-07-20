import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { EmployeeService } from 'src/app/shared';
import { MessageService } from 'primeng/api';
import { MESSAGE_TITLE } from 'src/app/shared';
import { EmployeeCreateAndUpdate } from 'src/app/demo/api/employee';
import { Genders } from 'src/app/shared/constants/gender';
@Component({
    selector: 'app-employee-create',
    templateUrl: './employee-create.component.html',
    styleUrls: ['./employee-create.component.scss'],
    providers: [MessageService],
})
export class EmployeeCreateComponent {
    genders: any[] = Genders;
    form!: FormGroup;
    constructor(
        private _router: Router,
        private _employeeService: EmployeeService,
        private _messageService: MessageService,
        private _fb: FormBuilder
    ) {}

    ngOnInit() {
        this.initFormCreateEmployee();
    }

    initFormCreateEmployee() {
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
            imageFile: [null],
            username: ['', Validators.compose([Validators.required])],
            password: ['', Validators.compose([Validators.required, Validators.pattern(password)])],
            workShiftId: [0, Validators.compose([Validators.required])],
        });
    }

    onFileSelect(event: any): void {
        this.form.get('imageFile')?.setValue(event.files[0]);
    }

    createEmployee() {
        if (this.form.get('birthday')?.value) {
            this.form.patchValue({
                birthday: this.form.get('birthday')?.value.toISOString(),
            });
        }
        const formData = new FormData();
        Object.keys(this.form.controls).forEach((key) => {
            const control = this.form.get(key);
            if (control) {
                formData.append(key, control.value);
            }
        });
        this._employeeService.createEmployee(formData as EmployeeCreateAndUpdate).subscribe(
            (next) => {
                this.navigateBackEmployeeList();
                this._messageService.add({ severity: 'success', summary: 'Successful', detail: MESSAGE_TITLE.ADD_NEW_BRANCH_SUCC, life: 3000 });
            },
            (error) => {
                error.error.messages.forEach((item: string) => {
                    this._messageService.add({ severity: 'error', summary: 'Error', detail: item, life: 3000 });
                });
            }
        );
    }

    navigateBackEmployeeList() {
        this._router.navigate(['manage-employee/list']);
    }
}
