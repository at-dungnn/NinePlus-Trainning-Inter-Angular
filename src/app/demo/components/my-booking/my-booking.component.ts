import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastService } from 'src/app/shared/services/toast.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { SessionService } from 'src/app/core';
import { BookingService } from 'src/app/shared/services/booking.service';
import { BookingDetailResponses, MyBooking } from '../../api/my-booking';
import { cloneDeep, isEmpty } from 'lodash';
import { MESSAGE_TITLE, ROUTER, TOAST } from 'src/app/shared';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FilterHelper } from 'src/app/core/helpers/filter.helper';
import { HttpErrorResponse } from '@angular/common/http';
import { BookingStatusService } from 'src/app/shared/services/booking-status.service';
import { BookingStatus } from 'src/app/shared/models/bookingStatus';
import { DialogService } from 'primeng/dynamicdialog';
import { BOOKINGSTATUS } from 'src/app/shared/constants/status.constant';

@Component({
    selector: 'app-my-booking',
    templateUrl: './my-booking.component.html',
    styleUrls: ['./my-booking.component.scss'],
    providers: [MessageService, ToastService, ConfirmationService, DialogService],
})
export class MyBookingComponent {
    customerId = '';
    myBooking: MyBooking[] = [];
    keyToast = TOAST.KEY_BC;
    formFilter!: FormGroup;
    statusPage: number = 0;
    status!: BookingStatus[];
    isShowWriteFeedBack: boolean = false;
    bookingDetail!: BookingDetailResponses;
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
                const result = this.handleBookingStatusDone(res.data as MyBooking[]);
                this.handleTotalMoneyAndTimeMyBooking(result);
            },
        });
    }

    handleBookingStatusDone(myBooking: MyBooking[]): MyBooking[] {
        const result: MyBooking[] = [];
        myBooking.forEach((item, indexBooking) => {
            const temp: MyBooking = item;
            if (item.bookingStatus === 3) {
                item.bookingDetailResponses.length > 0 &&
                    item.bookingDetailResponses.forEach((bookingDetail, indexBookingDetail) => {
                        let booking: MyBooking = cloneDeep(item);
                        booking.bookingDetailResponses = [];
                        booking.bookingDetailResponses.push(bookingDetail);
                        result.push(booking);
                    });
            } else {
                result.push(item);
            }
        });
        return result;
    }

    handleTotalMoneyAndTimeMyBooking(data: MyBooking[]) {
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
        result.sort((d1, d2) => new Date(d2.bookingDate + '').getTime() - new Date(d1.bookingDate + '').getTime());
        this.myBooking = result as MyBooking[];
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
            this.statusPage = 0;
        } else {
            this.formFilter.patchValue({
                bookingStatus: status,
            });
            this.filterBooking();
        }
    }

    navigateToEditBooking(booking: MyBooking) {
        if (booking.bookingStatus === 1) {
            const data = JSON.stringify(booking);
            setTimeout(() => {
                this._router.navigate([ROUTER.EDIT_CLIENT_BOOKING + '/' + booking.bookingId, { queryParams: data }]);
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

    showDialogWirteFeedBack(bookingDetail: BookingDetailResponses, booking: MyBooking) {
        const status = this.status.find((item) => {
            return item.id === booking.bookingStatus;
        });
        if (status && status.value === BOOKINGSTATUS.DONE) {
            this.bookingDetail = bookingDetail;
            this.isShowWriteFeedBack = true;
        }
    }
    hiddenDialogWirteFeedback() {
        this.isShowWriteFeedBack = false;
    }

    filterBooking() {
        let param = FilterHelper.removeNullValue(this.formFilter.value);
        this._bookingService.filterMyBooking(param, this.customerId).subscribe({
            next: (res: any) => {
                if (!isEmpty(res.data)) {
                    const result = this.handleBookingStatusDone(res.data as MyBooking[]);
                    this.handleTotalMoneyAndTimeMyBooking(result);
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
