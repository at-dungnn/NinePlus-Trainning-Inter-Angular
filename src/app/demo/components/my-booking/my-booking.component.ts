import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastService } from 'src/app/shared/services/toast.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { SessionService } from 'src/app/core';
import { BookingService } from 'src/app/shared/services/booking.service';
import { BookingDetailResponses, MyBooking } from '../../api/my-booking';
import { chain, isEmpty } from 'lodash';
import { MESSAGE_TITLE, ROUTER, TOAST } from 'src/app/shared';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FilterHelper } from 'src/app/core/helpers/filter.helper';
import { HttpErrorResponse } from '@angular/common/http';
import { BookingStatusService } from 'src/app/shared/services/booking-status.service';
import { BookingStatus } from 'src/app/shared/models/bookingStatus';

interface Booking {
    date: string;
    history: MyBooking[];
}

@Component({
    selector: 'app-my-booking',
    templateUrl: './my-booking.component.html',
    styleUrls: ['./my-booking.component.scss'],
    providers: [MessageService, ToastService, ConfirmationService],
})
export class MyBookingComponent {
    customerId = '';
    myBooking: Booking[] = [];
    keyToast = TOAST.KEY_BC;
    formFilter!: FormGroup;
    statusPage: number = 0;
    status!: BookingStatus[];
    constructor(
        private _router: Router,
        private _layoutService: LayoutService,
        private _sessionService: SessionService,
        private _bookingService: BookingService,
        private _toastService: ToastService,
        private _confirmationService: ConfirmationService,
        private _fb: FormBuilder,
        private _bookingStatusService: BookingStatusService,
        private _detect: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.initForm();
        this.getListBookingStatus();
        this.getListMyBooking();
    }

    initForm(): void {
        this.formFilter = this._fb.group({
            keyword: [''],
            bookingStatus: [''],
        });
    }

    getListBookingStatus() {
        this._bookingStatusService.getListStatusBooking().subscribe((res) => {
            this.status = res.data?.reverse() as BookingStatus[];
        });
    }

    getListMyBooking() {
        this.customerId = this._sessionService.userAuthenticate.userId;
        this._bookingService.getListBookingWithIdCustomer(this.customerId).subscribe({
            next: (res) => {
                const myBooking = this.handleTotalMoneyAndTimeMyBooking(res.data as MyBooking[]);
                this.groupByDateBooking(myBooking);
            },
        });
    }

    groupByDateBooking(myBooking: MyBooking[]) {
        // Group the elements of Array based on `bookingDate` property
        const result = chain(myBooking)
            .groupBy('bookingDate')
            .map((value, key) => ({ date: key, history: value }))
            .value();
        result.sort((d1, d2) => new Date(d2.date).getTime() - new Date(d1.date).getTime());
        this.myBooking = result as Booking[];
    }

    handleTotalMoneyAndTimeMyBooking(data: MyBooking[]): MyBooking[] {
        data.forEach((booking, index) => {
            if (booking.bookingDetailResponses && booking.bookingDetailResponses.length > 0) {
                data[index].totalMoney = booking.bookingDetailResponses?.reduce((accumulator: number, currentValue: BookingDetailResponses) => {
                    return accumulator + currentValue.servicePrice;
                }, 0);
            }
        });
        const result = data.map((booking) => {
            booking.fromTime = this.handleHoursMinutes(booking.fromTime + '');
            booking.toTime = this.handleHoursMinutes(booking.toTime + '');
            return booking;
        });
        return result;
    }

    getBookingWithStatus(status: number | undefined) {
        this.formFilter.patchValue({
            keyword: '',
        });
        if (status) {
            this.statusPage = status;
        }
        if (status === 0) {
            this.getListMyBooking();
        } else {
            this.formFilter.patchValue({
                bookingStatus: status,
            });
            this.filterBooking();
        }
    }

    navigateToEditBooking(booking: MyBooking) {
        if (booking.bookingStatus === 1) {
            setTimeout(() => {
                this._router.navigate([ROUTER.EDIT_CLIENT_BOOKING + '/' + booking.bookingId]);
            }, 1000);
        }
    }

    handleDeleteBooking(booking: MyBooking) {
        //   check id exist
        this._bookingService.getBookingById(booking.bookingId + '').subscribe({
            next: (data) => {
                this._bookingService.deleteBooking(booking.bookingId + '').subscribe({
                    next: (res) => {
                        res.messages &&
                            res.messages.length > 0 &&
                            res.messages.forEach((messsage: string) => {
                                this._toastService.showSuccess(messsage, this.keyToast);
                            });
                        this.filterBooking();
                        setTimeout(() => {
                            this.getListMyBooking();
                        }, 1000);
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

    showConfirmDelete(booking: MyBooking) {
        if (booking.bookingStatus === 1 || booking.bookingStatus === 3) {
            this._confirmationService.confirm({
                message: `Are you sure you want to delete booking with id: ${booking.bookingId} ?`,
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
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
    }

    showErrorResponse(err: HttpErrorResponse) {
        err.error.messages.length > 0 &&
            err.error.messages?.forEach((messsage: string) => {
                this._toastService.showError(messsage, this.keyToast);
            });
    }

    filterBooking() {
        let param = FilterHelper.removeNullValue(this.formFilter.value);
        this._bookingService.filterMyBooking(param, this.customerId).subscribe({
            next: (res: any) => {
                if (!isEmpty(res.data)) {
                    const myBooking = this.handleTotalMoneyAndTimeMyBooking(res.data as MyBooking[]);
                    this.groupByDateBooking(myBooking);
                    this._detect.detectChanges();
                } else {
                    this._toastService.showWarning(MESSAGE_TITLE.LIST_EMPTY, this.keyToast);
                    this.myBooking = [];
                }
            },
            error: (error) => {
                error.error.messages.forEach((item: string) => {
                    this._toastService.showError(item, this.keyToast);
                });
            },
        });
    }

    handleHoursMinutes(string: string): string {
        const date = new Date(string);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const time = (hours > 9 ? String(hours) : '0' + String(hours)) + 'h' + (minutes > 9 ? String(minutes) : '0' + String(minutes));
        return time;
    }

    clearFilter(): void {
        this.formFilter.reset();
        this.initForm();
        this.getListMyBooking();
        this.statusPage = 0;
    }

    get filledInput(): boolean {
        return this._layoutService.config.inputStyle === 'filled';
    }
}
