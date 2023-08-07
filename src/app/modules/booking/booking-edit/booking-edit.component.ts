import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { isEmpty } from 'lodash';
import { HandleString, MESSAGE_ERROR_INPUT, MESSAGE_TITLE, ROUTER, TOAST } from 'src/app/shared';
import { ToastService } from 'src/app/shared/services/toast.service';
import { MessageService } from 'primeng/api';
import { BookingService } from 'src/app/shared/services/booking.service';
import { ServicesService } from 'src/app/shared/services/service.service';
import { Services } from 'src/app/demo/api/booking-detail';
import { BookingUpdate } from 'src/app/demo/api/booking-update';

const MESSAGE_ERROR = {
    CHECK_ID_BOOKING: 'Booking does not exist or recheck internet connection',
};

@Component({
    selector: 'app-booking-edit',
    templateUrl: './booking-edit.component.html',
    styleUrls: ['./booking-edit.component.scss'],
    providers: [MessageService, ToastService],
})
export class BookingEditComponent implements OnInit {
    submitted: boolean = false;
    bookingId: string = '';
    isLoadingSubmit: boolean = false;
    keyToast = TOAST.KEY_BC;
    form!: FormGroup;
    service: Services[] = [];
    name: Services[] = [];
    bookingUpdate: BookingUpdate[] = [];
    hourFormat: string = '12';

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _bookingService: BookingService,
        private _serviceService: ServicesService,
        private _router: Router,
        private _toastService: ToastService,
        private _fb: FormBuilder
    ) {}

    ngOnInit(): void {
        this.getAllService();
        this.getIdParamRequest();
        this.initFormUpdateBooking();
    }

    getIdParamRequest() {
        this._activatedRoute.paramMap.subscribe((params) => {
            this.bookingId = params.get('id') + '';
        });
    }

    initFormUpdateBooking() {
        this._bookingService.getBookingById(this.bookingId).subscribe({
            next: (data) => {
                if (!isEmpty(data)) {
                    console.log(data);
                    const booking = data as BookingUpdate;
                    this.form = this._fb.group({
                        id: [booking.id],
                        customerId: [booking?.customerId, [Validators.required]],
                        bookingDate: [new Date(booking?.bookingDate + ''), [Validators.required]],
                        fromTime: [new Date(booking?.fromTime + ''), [Validators.required]],
                        toTime: [new Date(booking?.toTime + ''), [Validators.required]],
                        note: [booking?.note],
                        serviceId: [booking.servicesId, Validators.required],
                    });
                }
            },
            error: (err) => {
                console.log(err);
            },
        });
    }

    onSubmit() {
        this.loadingSubmit();
        this.submitted = true;
        if (this.form.valid) {
            this._bookingService.getBookingById(this.bookingId).subscribe({
                next: (data) => {
                    if (!isEmpty(data)) {
                        this.saveBooking(this.form.value);
                    }
                },
                error: (err) => {
                    console.log(err);
                    this._toastService.showError(MESSAGE_ERROR.CHECK_ID_BOOKING, this.keyToast);
                },
            });
        } else {
            this._toastService.showError(MESSAGE_ERROR_INPUT.VALID, this.keyToast);
        }
        console.log(this.form);
    }

    saveBooking(booking: BookingUpdate) {
        this._bookingService.updateBooking(booking).subscribe({
            next: (res) => {
                if (res.succeeded && res.data) {
                    this._toastService.showSuccess(MESSAGE_TITLE.EDIT_SUCC, this.keyToast);
                    setTimeout(() => {
                        this.navigateBackAllBooking();
                    }, 1500);
                }
            },
            error: (err) => {
                console.log(err);
                this._toastService.showError(MESSAGE_TITLE.EDIT_ERR, this.keyToast);
            },
        });
    }
    getAllService() {
        this._serviceService.getListServices().subscribe((res) => {
            if (res.data && res.data.length) {
                this.service = res.data as Services[];
            }
        });
    }
    loadingSubmit() {
        this.isLoadingSubmit = true;
        setTimeout(() => (this.isLoadingSubmit = false), 1300);
    }
    navigateBackAllBooking() {
        this._router.navigate([ROUTER.LIST_BOOKING]);
    }
    get f() {
        return this.form.controls;
    }
}
