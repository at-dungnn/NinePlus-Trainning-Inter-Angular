import * as _ from 'lodash';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import {
    HandleString,
    MESSAGE_ERROR_INPUT,
    MESSAGE_TITLE,
    ROUTER,
    TOAST,
} from 'src/app/shared';
import { ToastService } from 'src/app/shared/services/toast.service';
import { HttpErrorResponse } from '@angular/common/http';
import { BookingService } from 'src/app/shared/services/booking.service';
import { Booking } from 'src/app/demo/api/booking';

@Component({
    selector: 'app-booking-create',
    templateUrl: './booking-create.component.html',
    providers: [MessageService, ToastService],
})
export class BookingCreateComponent {
    isLoadingSubmit = false;
    submitted: boolean = false;
    formAddNewBooking!: FormGroup;
    phoneNumberParttern = '[()0-9]{10,12}';
    keyToast = TOAST.KEY_BC;
    constructor(
        private _bookingService: BookingService,
        private _router: Router,
        private _toastService: ToastService,
        private _fb: FormBuilder
    ) {}

    initFormAddNewBooking() {
        this.formAddNewBooking = this._fb.group({
            customerName: ['', [Validators.required, Validators.minLength(4)]],
            phoneNumber: [
                '',
                [
                    Validators.required,
                    Validators.pattern(this.phoneNumberParttern),
                ],
            ],
            bookingDate: [''],
            fromTime: [''],
            toTime: [''],
            note: [''],
        });
    }

    onSubmit() {
        this.submitted = true;
        let newBooking = this.valueFormAddNewBooking;
        if (this.formAddNewBooking.valid) {
            this._bookingService.getListBooking().subscribe((res) => {
                if (res.data && res.data.length > 0) {
                    this.saveBooking(newBooking);
                }
            });
        }
    }

    saveBooking(newBooking: Booking) {
        this._bookingService.addBooking(newBooking).subscribe({
            next: (res) => {
                if (res.succeeded) {
                    this._toastService.showSuccess(
                        MESSAGE_TITLE.ADD_SUCCESS,
                        this.keyToast
                    );
                    setTimeout(() => {
                        this._router.navigate([ROUTER.LIST_BOOKING]);
                    }, 1500);
                }
            },
            error: (err) => {
                console.log(err);
                this.showErrorResponse(err);
            },
        });
    }
    showErrorResponse(err: HttpErrorResponse): void {
        if (err.status === 400 && err.error?.messages?.length > 0) {
            err.error.messages?.forEach((ms: string) => {
                this._toastService.showError(ms, this.keyToast);
            });
        }
    }

    keyPressPhoneNumber(event: any) {
        const pattern = /[0-9]/;
        let inputChar = String.fromCharCode(event.charCode);
        if (event.keyCode != 8 && !pattern.test(inputChar)) {
            event.preventDefault();
        }
    }
    get valueFormAddNewBooking() {
        return this.formAddNewBooking.value;
    }
    get f() {
        return this.formAddNewBooking.controls;
    }
    loadingSubmit() {
        this.isLoadingSubmit = true;
        setTimeout(() => (this.isLoadingSubmit = false), 1300);
    }

    navigateBackEmployeeList() {
        this._router.navigate([ROUTER.LIST_BOOKING]);
    }
}
