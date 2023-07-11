import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Customer } from 'src/app/demo/api/customer';
import { CustomerService } from 'src/app/demo/service/customer.service';
import { MESSAGE_TITLE } from 'src/app/shared';
import * as _ from 'lodash';
@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  providers: [MessageService]
})
export class CustomerCreateComponent {

  constructor(private customerService: CustomerService,
    private messageService: MessageService,
    private router: Router) { }

  submitted: boolean = false;

  isLoadingSubmit = false;

  formAddNewCustomer: FormGroup = new FormGroup({
    id: new FormControl('', [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
    name: new FormControl('', [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
    phone_number: new FormControl('', [Validators.required, Validators.minLength(10),
    Validators.pattern('[- +()0-9]{10,12}')]),
    address: new FormControl(''),
    date_of_birth: new FormControl(''),
    total_money: new FormControl('')
  });

  onSubmit() {
    this.submitted = true;
    if (this.formAddNewCustomer.valid) {
      this.loadingSubmit()
      this.customerService.getCustomerById(this.valueFormAddNewCustomer.id).subscribe({
        next: (customer) => {
          this.saveCustomer(customer)
        },
        error: (err) => {
          console.log(err)
        }
      })
    }
  }

  saveCustomer(customer: Customer) {
    customer = this.trimValue(this.valueFormAddNewCustomer)
    this.customerService.postCustomer(customer).subscribe((data) => {
      console.log(data);
      this.showSuccess(MESSAGE_TITLE.ADD_SUCCESS)
      setTimeout(() => {
        this.router.navigate(['/customer/list'])
      }, 1500)
    })
  }

  trimValue(customer: Customer): Customer {
    if (customer.id?.startsWith(" ") || customer.id?.endsWith(" ")) {
      customer.id = customer.id.trim()
    }
    if (customer.name?.startsWith(" ") || customer.name?.endsWith(" ")) {
      customer.name = customer.name.trim()
    }
    if (customer.address?.startsWith(" ") || customer.address?.endsWith(" ") && customer.address) {
      customer.address = customer.address.trim()
    }
    if (customer.phone_number?.startsWith(" ") || customer.phone_number?.endsWith(" ")) {
      customer.phone_number = customer.phone_number.trim()
    }
    if (customer?.date_of_birth) {
      customer.date_of_birth = new Date(customer.date_of_birth)
    }
    customer.total_money = Number(customer.total_money)
    return customer
  }

  showSuccess(message: string) {
    this.messageService.add({
      key: 'bc',
      severity: 'success',
      summary: 'Success',
      detail: message
    });
  }

  showError(message: string) {
    this.messageService.add({
      key: 'bc',
      severity: 'error',
      summary: 'Error',
      detail: message,
    });
  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  loadingSubmit() {
    this.isLoadingSubmit = true;
    setTimeout(() => this.isLoadingSubmit = false, 1000);
  }

  get f() {
    return this.formAddNewCustomer.controls;
  }

  get valueFormAddNewCustomer() {
    return this.formAddNewCustomer.value;
  }

}
