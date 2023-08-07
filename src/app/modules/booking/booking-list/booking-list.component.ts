import * as _ from 'lodash';
import { Component, OnInit } from '@angular/core';
import { Booking } from 'src/app/demo/api/booking';
import { BookingService } from 'src/app/shared/services/booking.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { Table } from 'primeng/table';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { MESSAGE_TITLE, ROUTER, TOAST, LanguageFlag, LANGUAGES } from 'src/app/shared';
import { TranslationService } from '../../i18n';


@Component({
    templateUrl: './booking-list.component.html',
    styleUrls: ['./booking-list.component.scss'],
    providers: [
        ConfirmationService,
        DialogService,
        ToastService,
        MessageService,
    ],
})
export class BookingListComponent implements OnInit {
    language: LanguageFlag | undefined;
    langs = LANGUAGES;
    bookings: Booking[] = [];

    isSkeleton: boolean = false;

    resetPageOnSort: boolean = false;

    submitted: boolean = false;

    keyToast: string = '';

       visible: boolean = false;


    constructor(
        private _bookingService: BookingService,
        private _toastService: ToastService,
        private _confirmationService: ConfirmationService,
        private _router: Router,
        public _dialogService: DialogService,
        private _translationService: TranslationService,
    ) {
        this.formatFormTo;
    }

    ngOnInit() {
        this.showSkeleton();
        this.getAllBooking();
        this.initKeyToast();
      
    }

    showSkeleton() {
        this.isSkeleton = true;
        setTimeout(() => {
            this.isSkeleton = false;
        }, 1000);
    }

    getAllBooking() {
        this._bookingService.getListBooking().subscribe((res) => {
            if (res.data && res.data.length) {
                this.bookings = res.data as Booking[];
            }
        });
    }

    initKeyToast() {
        this.keyToast = TOAST.KEY_BC;
    }

    handleDeleteBooking(id: string) {
        this._bookingService.getBookingById(id).subscribe({
            next: (data) => {
                if (!_.isEmpty(data)) {
                    this._bookingService.deleteBooking(id).subscribe((res) => {
                        if (res.succeeded) {
                            this.resetPageOnSort = true;
                            this.getAllBooking();
                            if (_.isEmpty(res.messages)) {
                                res.messages?.forEach((string: string) => {
                                    this._toastService.showSuccess(
                                        string,
                                        this.keyToast
                                    );
                                });
                            }
                        }
                    });
                }
            },
            error: (err) => {
                console.log(err);
                this.getAllBooking();
            },
        });
    }
    navigateToCreateBooking() {
        this._router.navigate([ROUTER.CREATE_BOOKING]);
    }

    navigateToEditBooking(booking: Booking) {
        this._router.navigate([ROUTER.EDIT_BOOKING + '/' + booking.id]);
    }

    navigateToDetailBooking(booking: Booking) {
        this._router.navigate([ROUTER.DETAIL_BOOKING + '/' + booking.id]);
    }

    showConfirmDelete(booking: Booking) {
        this._confirmationService.confirm({
            message: `${MESSAGE_TITLE.CONFIRM_DELETE} ${booking.customerName}?`,
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            key: 'confirm',
            accept: () => {
                this.handleDeleteBooking(booking.id + '');
                this._confirmationService.close();
            },
            reject: () => {
                this._confirmationService.close();
            },
        });
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }

    formatFormTo({from, to}: any) {
        const dateParse1 = from?.split(" ");
        const dateParse2 = to?.split(" ");
        const result = `${dateParse1[0] - dateParse2[0]} ${dateParse1[1]}`;
        console.log(result);
        return result;
    }

    showDialog() {
        this.visible = true;
    }
  
}
