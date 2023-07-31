import * as _ from 'lodash';
import { Component } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { ROUTER } from 'src/app/shared';
import { BookingService } from 'src/app/shared/services/booking.service';
import { BookingDetail} from 'src/app/demo/api/booking-detail';

@Component({
    selector: 'app-booking-detail',
    templateUrl: './booking-detail.component.html',
    styleUrls: ['./booking-detail.component.scss'],
})
export class BookingDetailComponent {
    bookingDetail: BookingDetail = {};
    serviceName : string = '';
    bookingId: string = '';

    constructor(
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _bookingService: BookingService
    ) {}
    ngOnInit() {
        this.getIdRequestParam();
        this.getBookingById(this.bookingId);
    }

    getNameServices(bookingDetail : BookingDetail) {
        let names: any = [];
        bookingDetail.services?.forEach((item, index) => {
            names[index] = item.name;
        });
        this.serviceName = names.join(' , ');
        console.log(this.serviceName);
    }

    getIdRequestParam() {
        this._activatedRoute.paramMap.subscribe((params) => {
            this.bookingId = params.get('id') + '';
        });
    }

    getBookingById(id: string) {
        this._bookingService.getBookingById(id).subscribe((data) => {
            if (!_.isEmpty(data)) {
                this.bookingDetail = data as BookingDetail;
                this.getNameServices(this.bookingDetail);
            }
        });
    }

    navigateToListBooking() {
        this._router.navigate([ROUTER.LIST_BOOKING]);
    }
}
