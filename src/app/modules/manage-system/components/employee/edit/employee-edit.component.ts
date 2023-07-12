import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MESSAGE_TITLE } from 'src/app/shared';
import { EmployeeService } from 'src/app/shared';
import { Employee } from 'src/app/demo/api/employee';
import { MessageService } from 'primeng/api';
import { Validators } from '@angular/forms';
@Component({
    selector: 'app-employee-edit',
    templateUrl: './employee-edit.component.html',
    styleUrls: ['./employee-edit.component.scss'],
    providers: [MessageService],
})
export class EmployeeEditComponent {
    genders: any[] = [];
    date: Date | undefined;
    form: FormGroup;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private employeeService: EmployeeService,
        private messageService: MessageService
    ) {
        this.genders = [
            { name: 'Male', code: 'M' },
            { name: 'Female', code: 'F' },
            { name: 'LGBT', code: 'L' },
        ];
        this.get();

        
        // Form get data and validate
        const uppercaseFirstName = /^[A-Z][a-zA-Z]*$/;
        const phone = /^(?:\+?84|0)(?:\d{9,10})$/;
        const email = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        this.form = new FormGroup({
            id: new FormControl('', [Validators.required]),
            name: new FormControl('', [Validators.required, Validators.pattern(uppercaseFirstName)]),
            gender: new FormControl(),
            birthday: new FormControl(),
            phone: new FormControl('', [Validators.required, Validators.pattern(phone)]),
            address: new FormControl(),
            email: new FormControl('', [Validators.required, Validators.pattern(email)]),
            image: new FormControl(),
            workshiftId: new FormControl('', [Validators.required]),
        });
    }

    navigateBackEmployeeList() {
        this.router.navigate(['manage-employee/list']);
    }

    get() {
        this.activatedRoute.paramMap.subscribe((next) => {
            const id = next.get('id');
            if (id != null) {
                // console.log(id.toString());
                this.employeeService.getById(id).subscribe(
                    (next) => {
                        this.form.patchValue(next);
                    },
                    (error) => {
                        console.log(error);
                    }
                );
            }
        });
    }

    update() {
        this.employeeService.updateById(this.form.value).subscribe(
            (next) => {
                this.navigateBackEmployeeList();
                this.messageService.add({ severity: MESSAGE_TITLE.SUCCESS, summary: 'Successful', detail: MESSAGE_TITLE.EDIT_SUCC, life: 3000 });
            },
            (error) => {
                console.log('Lỗi đường dẫn');
                console.log(error);
            }
        );
    }
}
