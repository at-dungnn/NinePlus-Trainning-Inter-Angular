import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { isEmpty } from 'lodash';
import { BookingDetail } from 'src/app/demo/api/booking-detail';
import { BookingService } from 'src/app/shared/services/booking.service';

@Component({
    selector: 'app-history-booking',
    templateUrl: './historybooking.component.html',
})
export class HistorybookingComponent implements OnInit {
    @Output() controlDialog: EventEmitter<any> = new EventEmitter();

    @Input() dialogBooking: boolean = false;

    @Input() customerId: string = '';

    historyBookings: BookingDetail[] = [];

    constructor(private _bookingService: BookingService) {}

    ngOnInit(): void {
        this.getListHistoryBooking();
    }

    hideDialogBooking() {
        // child call parent
        this.controlDialog.emit();
    }

    getListHistoryBooking() {
        this._bookingService
            .getHistoryBooking(this.customerId)
            .subscribe((res) => {
                if (!isEmpty(res.data) && res.data) {
                    // pending API BE
                }
            });
    }
}
