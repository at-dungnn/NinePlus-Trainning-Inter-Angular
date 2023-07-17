import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';
import { EmployeeService } from 'src/app/shared';
import { MessageService } from 'primeng/api';
import { MESSAGE_TITLE } from 'src/app/shared';

@Component({
    selector: 'app-employee-create',
    templateUrl: './employee-create.component.html',
    styleUrls: ['./employee-create.component.scss'],
    providers: [MessageService],
})
export class EmployeeCreateComponent {
    genders: any[] = [
        { name: 'Male', code: true },
        { name: 'Female', code: false },
    ];
    date: Date | undefined;
    form: FormGroup;
    constructor(private router: Router, private employeeService: EmployeeService, private messageService: MessageService) {
        // Form get data and validate
        // const uppercaseFirstName = /^[A-Z][a-zA-Z]*$/;
        // const phone = /^(?:\+?84|0)(?:\d{9,10})$/;
        // const email = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        // this.form = new FormGroup({
        //     id: new FormControl('', [Validators.required]),
        //     name: new FormControl('', [Validators.required, Validators.pattern(uppercaseFirstName)]),
        //     gender: new FormControl(),
        //     birthday: new FormControl(),
        //     phone: new FormControl('', [Validators.required, Validators.pattern(phone)]),
        //     address: new FormControl(),
        //     email: new FormControl('', [Validators.required, Validators.pattern(email)]),
        //     image: new FormControl(),
        //     workshiftId: new FormControl('', [Validators.required]),
        // });

        const uppercaseFirstName = /^[A-Z][a-zA-Z]*$/;
        const phone = /^(?:\+?84|0)(?:\d{9,10})$/;
        const email = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        this.form = new FormGroup({
            id: new FormControl('', [Validators.required]),
            name: new FormControl('', [Validators.required, Validators.pattern(uppercaseFirstName)]),
            gender: new FormControl(),
            birthday: new FormControl(),
            phoneNumber: new FormControl('', [Validators.required, Validators.pattern(phone)]),
            address: new FormControl(),
            email: new FormControl('', [Validators.required, Validators.pattern(email)]),
            image: new FormControl(),
            workShiftId: new FormControl('', [Validators.required]),
        });
    }

    navigateBackEmployeeList() {
        this.router.navigate(['manage-employee/list']);
    }

    createEmployee() {
        this.employeeService.createEmployee(this.form.value).subscribe(
            (next) => {
                this.navigateBackEmployeeList();
                this.messageService.add({ severity: MESSAGE_TITLE.SUCCESS, summary: 'Successful', detail: MESSAGE_TITLE.EDIT_SUCC, life: 3000 });
            },
            (error) => {
                console.log(error);
            }
        );
    }
}
