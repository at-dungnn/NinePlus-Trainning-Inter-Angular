import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MESSAGE_TITLE } from 'src/app/shared';
import { EmployeeService } from 'src/app/shared';
import { MessageService } from 'primeng/api';
import { Validators } from '@angular/forms';
import { EmployeeUpdate } from 'src/app/demo/api/employee';
@Component({
    selector: 'app-employee-edit',
    templateUrl: './employee-edit.component.html',
    styleUrls: ['./employee-edit.component.scss'],
    providers: [MessageService],
})
export class EmployeeEditComponent {
    genders = [
        { name: 'Male', code: 'M' },
        { name: 'Female', code: 'F' },
        { name: 'LGBT', code: 'L' },
    ];
    date: Date | undefined;
    form!: FormGroup;
    employee: EmployeeUpdate = {};
    birthdayInit!: Date;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private employeeService: EmployeeService,
        private messageService: MessageService,
        private _fb: FormBuilder
    ) {
        this.getEmployeeById();

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
        this.form = this._fb.group({
            id: ['', Validators.compose([Validators.required])],
            name: ['', Validators.compose([Validators.required, Validators.pattern(uppercaseFirstName)])],
            gender: [''],
            birthday: [''],
            phoneNumber: ['', Validators.compose([Validators.required, Validators.pattern(phone)])],
            address: [''],
            email: ['', Validators.compose([Validators.required, Validators.pattern(email)])],
            image: [''],
            workShiftId: ['', Validators.compose([Validators.required])],
        });
    }

    // ngOnInit() {
    //     // this.form.get('birthday')?.setValue(this.birthdayInit);

    // }
    navigateBackEmployeeList() {
        this.router.navigate(['manage-employee/list']);
    }

    getEmployeeById() {
        this.activatedRoute.paramMap.subscribe((next) => {
            const id = next.get('id');
            if (id != null) {
                this.employeeService.getByIdBackEnd(id).subscribe(
                    (next) => {
                        // this.employee=next.data;
                        this.form.patchValue(next.data);
                        this.birthdayInit = new Date(next.data.birthday);
                        // console.log(this.birthdayInit);
                        // console.log( this.form.get('birthday')?.value, 'birthday');
                    },
                    (error) => {
                        console.log(error);
                    }
                );
            }
        });
    }


    onBirthdayChange(event: any) {
        console.log(event); // In giá trị mới ra console
        // Hoặc bạn có thể gán giá trị mới cho một biến khác trong component
        // this.newBirthdayValue = event;
      }


    updateEmployeeById() {
        console.log(this.form.value);
        // this.employeeService.updateById(this.form.value).subscribe(
        //     (next) => {
        //         this.navigateBackEmployeeList();
        //         this.messageService.add({ severity: MESSAGE_TITLE.SUCCESS, summary: 'Successful', detail: MESSAGE_TITLE.EDIT_SUCC, life: 3000 });
        //     },
        //     (error) => {
        //         console.log('Lỗi đường dẫn');
        //         console.log(error);
        //     }
        // );
    }
}
