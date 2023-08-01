import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import {
    HandleString,
    MESSAGE_ERROR_INPUT,
    MESSAGE_TITLE,
    ROUTER,
    TOAST,
} from 'src/app/shared';
import * as _ from 'lodash';
import { ToastService } from 'src/app/shared/services/toast.service';
import { HttpErrorResponse } from '@angular/common/http';
import { BookingService } from 'src/app/shared/services/booking.service';

@Component({
    selector: 'app-booking-create',
    templateUrl: './booking-create.component.html',
    providers: [MessageService, ToastService],
})
export class BookingCreateComponent {
    submitted: boolean = false;
    formAddNewBooking!: FormGroup;

    keyToast: string = '';

    constructor(
      private _bookingService: BookingService,
      private _router: Router,
      private _toastService: ToastService,
      private _fb: FormBuilder
  ) {}

  initKeyToast() {
    this.keyToast = TOAST.KEY_BC;
}

initFormAddNewCustomer() {
  this.formAddNewBooking= this._fb.group({
      customerName: ['', [Validators.required, Validators.minLength(4)]],
      address: [''],
      dateOfBirth: [''],
      username: [''],
      password: [''],
      totalMoney: [0],
  });
}
}
