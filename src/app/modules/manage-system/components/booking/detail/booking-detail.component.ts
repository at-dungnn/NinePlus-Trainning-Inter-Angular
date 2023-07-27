import * as _ from 'lodash';
import { Component } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { ROUTER } from 'src/app/shared';
import { BookingService } from 'src/app/shared/services/booking.service';
import { Booking } from 'src/app/demo/api/booking';

@Component({
    selector: 'app-booking-detail',
    templateUrl: './booking-detail.component.html',
    styleUrls: ['./booking-detail.component.scss'],
})
export class BookingDetailComponent {
    booking: Booking= {};

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

    getIdRequestParam() {
        this._activatedRoute.paramMap.subscribe((params) => {
            this.bookingId = params.get('id') + '';
        });
    }

    getBookingById(id: string) {
        this._bookingService.getBookingById(id).subscribe((data) => {
          console.log(data);
            if (!_.isEmpty(data)) {
                this.booking = data as Booking;
            }
        });
    }

    navigateToListBooking() {
        this._router.navigate([ROUTER.LIST_BOOKING]);
    }
}
