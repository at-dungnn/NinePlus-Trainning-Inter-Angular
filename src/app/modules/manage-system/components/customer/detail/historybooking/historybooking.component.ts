import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: "app-history-booking",
  templateUrl: './historybooking.component.html',
})
export class HistorybookingComponent implements OnInit {

  @Output() controlDialog: EventEmitter<any> = new EventEmitter();


  @Input() dialogBooking: boolean = false;

  bookings: any = [];

  hideDialog() {
    // child call parent
    this.controlDialog.emit()
  }
  ngOnInit(): void {
    // call api bookings
    this.bookings = [
      {
        id: 112,
        date: "14/04-2023 15:00 PM",
        name_service: "Massage",
        price: 5000000
      },
      {
        id: 112,
        date: "14/04-2023 15:00 PM",
        name_service: "Massage",
        price: 5000000
      },
      {
        id: 112,
        date: "14/04-2023 15:00 PM",
        name_service: "Massage",
        price: 5000000
      },
      {
        id: 112,
        date: "14/04-2023 15:00 PM",
        name_service: "Massage",
        price: 5000000
      },
      {
        id: 112,
        date: "14/04-2023 15:00 PM",
        name_service: "Massage",
        price: 5000000
      }
    ]
  }


}
