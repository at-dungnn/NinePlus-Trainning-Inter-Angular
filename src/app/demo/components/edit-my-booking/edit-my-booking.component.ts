import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastService } from 'src/app/shared/services/toast.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { BookingService } from 'src/app/shared/services/booking.service';
import { BookingDetailResponses, MyBooking } from '../../api/my-booking';
import { MESSAGE_TITLE, ROUTER, TOAST } from 'src/app/shared';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { cloneDeep, isEmpty, isNil } from 'lodash';
import { Service } from '../../api/service';
import { ServicesService } from 'src/app/shared/services/service.service';
import { Time, TimeActive } from 'src/app/shared/constants/active-time-spa';
import { BookingCreate } from '../../api/booking-create';

interface Booking {
    id?: number;
    bookingDate?: string;
    fromTime?: string;
    toTime?: string;
    note?: string;
    status?: number;
    services?: Service[];
}

@Component({
    selector: 'app-edit-my-booking',
    templateUrl: './edit-my-booking.component.html',
    styleUrls: ['./edit-my-booking.component.scss'],
    providers: [MessageService, ToastService, ConfirmationService],
})
export class EditMyBookingComponent {
    myBooking: Booking = {};
    keyToast = TOAST.KEY_BC;
    formUpdateBooking!: FormGroup;
    isLoading = false;
    services: Service[] = [];
    selectedServices: Service[] = [];
    totalMoney = 0;
    startTime!: Time[];
    endTime!: Time[];
    submitted = false;
    minDate!: Date;
    maxDate!: Date;
    fromTime = '';
    toTime = '';
    constructor(
        private _router: Router,
        private _layoutService: LayoutService,
        private _bookingService: BookingService,
        private _toastService: ToastService,
        private _confirmationService: ConfirmationService,
        private _fb: FormBuilder,
        private _route: ActivatedRoute,
        private _serviceService: ServicesService
    ) {}

    ngOnInit(): void {
        this.getMyBookingAndInitForm();
        this.getListService();
        this.initStartTimeAndEndTime();
    }

    getMyBookingAndInitForm() {
        this.formUpdateBooking = this._fb.group({
            id: [''],
            bookingDate: ['', Validators.required],
            fromTime: ['', Validators.required],
            toTime: ['', Validators.required],
            note: [''],
            serviceId: [[], Validators.required],
        });
        this._route.paramMap.subscribe((params: ParamMap) => {
            const idBooking = params.get('id') + '';
            if (idBooking) {
                this._bookingService.getBookingById(idBooking).subscribe({
                    next: (data) => {
                        if (!isEmpty(data) && !isNil(data)) {
                            const myBooking = data as Booking;
                            this.myBooking = myBooking;
                            this.handleTimeMyBooking(data as MyBooking);
                            this.formUpdateBooking.patchValue({
                                id: myBooking.id,
                                bookingDate: myBooking.bookingDate,
                                fromTime: myBooking.fromTime,
                                toTime: myBooking.toTime,
                                note: myBooking.note,
                            });
                        }
                    },
                });
            }
        });
    }

    getListService() {
        this._serviceService.getListServices().subscribe((res) => {
            if (res.data && res.data.length > 0) {
                this.services = res.data as Service[];
                const serviceIdSelected: number[] = [];
                if (this.myBooking?.services && this.myBooking.services.length > 0) {
                    this.myBooking.services?.forEach((item) => {
                        serviceIdSelected.push(item.id);
                    });
                }
                for (let i = 0; i < serviceIdSelected.length; i++) {
                    const service: Service | undefined = (res.data as Service[]).find((item) => {
                        return serviceIdSelected[i] === item.id;
                    });

                    if (service) {
                        this.selectedServices.push(service);
                    }
                }
                if (this.selectedServices && this.selectedServices.length > 0) {
                    this.formUpdateBooking.patchValue({
                        serviceId: this.selectedServices,
                    });
                    this.totalMoney = this.handleSumMoneyBooking(this.selectedServices);
                }
            }
        });
    }

    initStartTimeAndEndTime() {
        this.endTime = TimeActive.endTime() as Time[];
        this.startTime = TimeActive.startTime() as Time[];
    }

    initMinAndMaxDateBooking() {
        this.minDate = new Date();
        this.maxDate = new Date();
        this.maxDate.setDate(this.maxDate.getDate() + 30);
        this.minDate.setDate(this.maxDate.getDate() - 30);
    }

    updateBooking() {
        this.isLoading = true;
        this.submitted = true;
        if (this.formUpdateBooking.valid) {
            let bookingClone = cloneDeep(this.valueForm);
            if (this.formUpdateBooking.value.serviceId.length > 0) {
                for (let i = 0; i < this.formUpdateBooking.value.serviceId.length; i++) {
                    bookingClone.serviceId[i] = this.formUpdateBooking.value.serviceId[i].id;
                }
            }
            this._bookingService.updateBooking(bookingClone as BookingCreate).subscribe({
                next: (res) => {
                    this._toastService.showSuccess(MESSAGE_TITLE.ADD_SUCCESS, this.keyToast);
                    setTimeout(() => {
                        this._router.navigate([ROUTER.MY_BOOKING]);
                    }, 1500);
                },
                error: (error) => {
                    setTimeout(() => {
                        this.isLoading = false;
                    }, 1000);
                    if (error.error.messages && error.error.messages.length > 0) {
                        error.error.messages.forEach((item: string) => {
                            this._toastService.showError(item, this.keyToast);
                        });
                    }
                },
            });
        } else {
            setTimeout(() => {
                this.isLoading = false;
            }, 1000);
        }
    }

    handleSumMoneyBooking(services: Service[]): number {
        const totalMoney = services.reduce((accumulator: number, currentValue: Service) => {
            return accumulator + Number(currentValue.price);
        }, 0);
        return totalMoney;
    }

    handleDeleteService(service: Service) {
        this.selectedServices = this.selectedServices.filter((item) => {
            return item !== service;
        });
        this.totalMoney = this.totalMoney = this.handleSumMoneyBooking(this.selectedServices);
    }

    handleChangeService(e: Event) {
        this.totalMoney = this.handleSumMoneyBooking(this.selectedServices);
    }

    handleDeleteBooking(booking: Booking) {
        //   check id exist
        this._bookingService.getBookingById(booking.id + '').subscribe({
            next: (data) => {
                this._bookingService.deleteBooking(booking.id + '').subscribe({
                    next: (res) => {
                        res.messages &&
                            res.messages.length > 0 &&
                            res.messages.forEach((messsage: string) => {
                                this._toastService.showSuccess(messsage, this.keyToast);
                            });
                        setTimeout(() => {
                            this._router.navigate([ROUTER.MY_BOOKING]);
                        }, 1500);
                    },
                    error: (error) => {
                        this.showErrorResponse(error);
                    },
                });
            },
            error: (error) => {
                this.showErrorResponse(error);
            },
        });
    }

    handleTimeMyBooking(data: MyBooking) {
        this.fromTime = this.handleHoursMinutes(data.fromTime + '');
        this.toTime = this.handleHoursMinutes(data.toTime + '');
    }

    handleHoursMinutes(string: string): string {
        const date = new Date(string);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const time = (hours > 9 ? String(hours) : '0' + String(hours)) + 'h' + (minutes > 9 ? String(minutes) : '0' + String(minutes));
        return time;
    }

    handleRemoveServices() {
        this.totalMoney = 0;
    }

    showConfirmDelete(booking: Booking) {
        this._confirmationService.confirm({
            key: 'confirm',
            accept: () => {
                this.handleDeleteBooking(booking);
                this._confirmationService.close();
            },
            reject: () => {
                this._confirmationService.close();
            },
        });
    }

    showErrorResponse(err: HttpErrorResponse) {
        err.error.messages.length > 0 &&
            err.error.messages?.forEach((messsage: string) => {
                this._toastService.showError(messsage, this.keyToast);
            });
    }

    convertDate(booking: BookingCreate) {
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

    get filledInput(): boolean {
        return this._layoutService.config.inputStyle === 'filled';
    }

    get valueForm() {
        return this.formUpdateBooking.value;
    }

    get f() {
        return this.formUpdateBooking.controls;
    }
}
