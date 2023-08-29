import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { isEmpty } from 'lodash';
import * as _ from 'lodash';
import { MESSAGE_ERROR_INPUT, MESSAGE_ERROR_INPUT_VN, MESSAGE_TITLE, MESSAGE_TITLE_VN, ROUTER, TOAST } from 'src/app/shared';
import { ToastService } from 'src/app/shared/services/toast.service';
import { MessageService } from 'primeng/api';
import { BookingService } from 'src/app/shared/services/booking.service';
import { ServicesService } from 'src/app/shared/services/service.service';
import { Services } from 'src/app/demo/api/booking-detail';
import { BookingUpdate } from 'src/app/demo/api/booking-update';
import { Booking } from 'src/app/demo/api/booking';
import { Time, TimeActive } from 'src/app/shared/constants/active-time-spa';
import { EqualsDateTime } from 'src/app/shared/validator/equal-date';

const MESSAGE_ERROR = {
    CHECK_ID_BOOKING: 'Booking does not exist or recheck internet connection',
};
interface UpdateBooking {
    id?: number;
    bookingDate?: string;
    fromTime?: string;
    toTime?: string;
    note?: string;
    services?: ServiceUpdate[];
}
interface ServiceUpdate {
    id: number;
    name: string;
    price: number;
    serviceTime: number;
}

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
    serviceId: Services[] = [];
    name: Services[] = [];
    bookingUpdate: BookingUpdate[] = [];
    hourFormat: string = '24';
    minDate!: Date;
    maxDate!: Date;
    startTime!: Time[];
    endTime!: Time[];
    idBookingInit: number = 0;
    bookingDateInit!: Date;
    fromTimeInit!: Date;
    toTimeInit!: Date;
    noteInit: string = '';

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
        this.initForm();
        this.initMinAndMaxDateBooking();
        this.initStartTimeAndEndTime();
    }

    getIdParamRequest() {
        this._activatedRoute.paramMap.subscribe((params) => {
            this.bookingId = params.get('id') + '';
        });
    }

   
    initForm(): void {
        this.form = this._fb.group({
            id: '',
            bookingDate: ['', Validators.required],
            fromTime: ['', Validators.required],
            toTime: ['', Validators.required],
            note: [''],
            serviceId: ['', Validators.required],
        });
        if (this.bookingId) {
            this._bookingService.getBookingById(this.bookingId).subscribe({
                next: (res) => {
                    this._updateFormValue(res as UpdateBooking);
                },
            });
        }
    }

    private _updateFormValue(data: UpdateBooking): void {
        let listServiceId: any = [];
        if (data.services && data.services.length > 0) {
            data.services?.forEach((element: any) => {
                listServiceId.push(element.id);
            });
        }

        this.form.patchValue({
            id: data.id,
            bookingDate:  data.bookingDate ? new Date(data.bookingDate) : '',
            fromTime:data.fromTime ? new Date(data.fromTime) : '',
            toTime:  data.toTime ? new Date(data.toTime) : '',
            note: data?.note,
            serviceId: listServiceId ? listServiceId : [],
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
                    this._toastService.showError(MESSAGE_ERROR.CHECK_ID_BOOKING, this.keyToast);
                },
            });
        } else {
            this._toastService.showError(MESSAGE_ERROR_INPUT_VN.VALID, this.keyToast);
        }
    }

    saveBooking(booking: BookingUpdate) {
        if (this.form.valid) {
            this.convertBookingDateFormat();
            let bookingClone = _.cloneDeep(this.form.value);
            if (this.form.value.serviceId.length > 0) {
                for (let i = 0; i < this.form.value.serviceId.length; i++) {
                    bookingClone.serviceId[i] = this.form.value.serviceId[i].id;
                }
            }

            bookingClone = this.handleValueDate(bookingClone as BookingUpdate);
            this._bookingService.updateBooking(booking).subscribe({
                next: (res) => {
                    if (res.succeeded && res.data) {
                        this._toastService.showSuccess(MESSAGE_TITLE_VN.EDIT_SUCC, this.keyToast);
                        setTimeout(() => {
                            this.navigateBackAllBooking();
                        }, 1500);
                    }
                },
                error: (err) => {
                    this._toastService.showError(MESSAGE_TITLE_VN.EDIT_ERR, this.keyToast);
                },
            });
        }
    }

    getAllService() {
        this._serviceService.getListServices().subscribe({
            next: (res) => {
                this.service = res.data as Services[];
                if (this.service.length === 0) {
                    this._toastService.showWarningNoKey(MESSAGE_TITLE_VN.LIST_EMPTY);
                }
            },
            error: (error) => {
                error.error.messages.forEach((item: string) => {
                    this._toastService.showErrorNoKey(item);
                });
            },
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

    handleValueDate(booking: BookingUpdate) {
        booking.fromTime = this.convertTime(String(booking.bookingDate), booking.fromTime as Time);
        booking.toTime = this.convertTime(String(booking.bookingDate), booking.toTime as Time);
        booking.bookingDate = this.convertDate(booking);
        return booking;
    }

    initMinAndMaxDateBooking() {
        this.minDate = new Date();
        this.maxDate = new Date();
        this.maxDate.setDate(this.maxDate.getDate() + 30);
    }

    initStartTimeAndEndTime() {
        this.endTime = TimeActive.endTime() as Time[];
        this.startTime = TimeActive.startTime() as Time[];
    }
    convertBookingDateFormat() {
        const originalDate = new Date(this.form.get('bookingDate')?.value);
        const year = originalDate.getFullYear();
        const month = String(originalDate.getMonth() + 1).padStart(2, '0');
        const day = String(originalDate.getDate()).padStart(2, '0');
        this.form.patchValue({
            bookingDate: `${year}-${month}-${day}T00:00:00`,
        });
    }
    convertDate(booking: BookingUpdate) {
        const originalDate = new Date(booking.bookingDate + '');
        const year = originalDate.getFullYear();
        const month = String(originalDate.getMonth() + 1).padStart(2, '0');
        const day = String(originalDate.getDate()).padStart(2, '0');
        const hours = String(originalDate.getHours()).padStart(2, '0');
        const minutes = String(originalDate.getMinutes()).padStart(2, '0');
        const seconds = String(originalDate.getSeconds()).padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    }

    convertTime(date: string, time: Time): string {
        const originalDate = new Date(date);
        const year = originalDate.getFullYear();
        const month = String(originalDate.getMonth() + 1).padStart(2, '0');
        const day = String(originalDate.getDate()).padStart(2, '0');
        if (time && time.data) {
            const hours = String(time.data.getHours()).padStart(2, '0');
            const minutes = String(time.data.getMinutes()).padStart(2, '0');
            return `${year}-${month}-${day}T${hours}:${minutes}:00`;
        }
        return '';
    }
}
