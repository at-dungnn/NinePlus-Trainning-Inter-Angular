import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastService } from 'src/app/shared/services/toast.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { SessionService } from 'src/app/core';
import { BookingService } from 'src/app/shared/services/booking.service';
import { BookingDetailResponses, MyBooking } from '../../api/my-booking';
import { chain } from 'lodash';
import { MESSAGE_TITLE, ROUTER, TOAST } from 'src/app/shared';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FilterHelper } from 'src/app/core/helpers/filter.helper';
import { HttpErrorResponse } from '@angular/common/http';

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
    statusPage = '4';

    constructor(
        private _router: Router,
        private _layoutService: LayoutService,
        private _sessionService: SessionService,
        private _bookingService: BookingService,
        private _toastService: ToastService,
        private _confirmationService: ConfirmationService,
        private _fb: FormBuilder,
        private _detect: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.initForm();
        this.getCustomerId();
        this.getListMyBooking();
    }

    initForm(): void {
        this.formFilter = this._fb.group({
            keyword: [''],
            bookingStatus: [''],
        });
    }

    getCustomerId() {
        this.customerId = this._sessionService.userAuthenticate.userId;
    }

    getListMyBooking() {
        this._bookingService.getListBookingWithIdCustomer(this.customerId).subscribe({
            next: (res) => {
                const data = this.handleSumMoneyBooking(res.data as MyBooking[]);
                this.groupByDateBooking(data);
            },
            error: (error) => {
                error.error.messages.forEach((item: string) => {
                    this._toastService.showError(item, this.keyToast);
                });
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

    handleSumMoneyBooking(data: MyBooking[]) {
        data.forEach((booking, index) => {
            if (booking.bookingDetailResponses && booking.bookingDetailResponses.length > 0) {
                data[index].totalMoney = booking.bookingDetailResponses?.reduce((accumulator: number, currentValue: BookingDetailResponses) => {
                    return accumulator + currentValue.servicePrice;
                }, 0);
            }
        });
        return data;
    }

    getBookingWithStatus(status: string) {
        this.statusPage = status;
        if (status === '4') {
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
                window.location.reload();
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
                const data = this.handleSumMoneyBooking(res.data as MyBooking[]);
                this.groupByDateBooking(data);
                if (this.myBooking.length === 0) {
                    this._toastService.showWarning(MESSAGE_TITLE.LIST_EMPTY, this.keyToast);
                }
                this._detect.detectChanges();
            },
            error: (error) => {
                error.error.messages.forEach((item: string) => {
                    this._toastService.showError(item, this.keyToast);
                });
            },
        });
    }
    
    clearFilter(): void {
        this.formFilter.reset();
        this.initForm();
        this.getListMyBooking();
    }

    get filledInput(): boolean {
        return this._layoutService.config.inputStyle === 'filled';
    }
}