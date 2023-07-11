import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BookingDetail } from 'src/app/demo/api/booking-detail';
import { BookingDetailService } from 'src/app/demo/service/booking-detail.service';

@Component({
  selector: "app-history-booking",
  templateUrl: './historybooking.component.html',
})
export class HistorybookingComponent implements OnInit {

  @Output() controlDialog: EventEmitter<any> = new EventEmitter();

  @Input() dialogBooking: boolean = false;

  @Input() idCustomer: string = '';

  bookings: BookingDetail[] = [];

  constructor(private bookingService: BookingDetailService) {
  }

  hideDialogBooking() {
    // child call parent
    this.controlDialog.emit()
  }
  ngOnInit(): void {
    this.fetListHistoryBooking()
  }

  fetListHistoryBooking () {
    this.bookingService.getHistoryBookingWithCustomer(this.idCustomer).subscribe(bookings => {
      this.bookings = bookings
    })
  }


}
