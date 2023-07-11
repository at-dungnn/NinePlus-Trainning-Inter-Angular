import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { MessageService } from 'primeng/api';
import { Customer } from 'src/app/demo/api/customer';
import { CustomerService } from 'src/app/demo/service/customer.service';
import { MESSAGE_TITLE } from 'src/app/shared';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  providers: [MessageService]

})
export class CustomerEditComponent implements OnInit {

  id: string = "";

  submitted: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private customerService: CustomerService,
    private router: Router,
    private messageService: MessageService,
  ) { }

  updateCustomerForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    phone_number: new FormControl(''),
    address: new FormControl(''),
    date_of_birth: new FormControl(''),
    total_money: new FormControl('')
  });

  ngOnInit(): void {
    this.getIdParamRequest();
    this.initFormUpdateCustomer()
  }

  getIdParamRequest() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.id = params.get('id') + "";
    });
  }

  initFormUpdateCustomer() {
    this.customerService.getCustomerById(this.id).subscribe(data => {
      this.updateCustomerForm = new FormGroup({
        id: new FormControl(data.id, [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
        name: new FormControl(data.name, [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
        phone_number: new FormControl(data.phone_number, [Validators.required, Validators.minLength(10),
        Validators.pattern('[- +()0-9]{10,12}')]),
        address: new FormControl(data?.address),
        date_of_birth: new FormControl(data?.date_of_birth ? new Date(data.date_of_birth) : ''),
        total_money: new FormControl(data?.total_money)
      });

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

  onSubmit() {
    this.submitted = true;
    if (this.updateCustomerForm.valid) {
      let customer = this.trimValue(this.valueFormUpdateCustomer)
      this.customerService.updateCustomer(customer).subscribe((res) => {
        this.showSuccess(MESSAGE_TITLE.SAVE_SUCC)
        setTimeout(() => {
          this.router.navigate(['/customer/list'])
        }, 1500)
      })
    }
  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  navigateToListCustomer() {
    this.router.navigate(['/customer/list'])
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

  get f() {
    return this.updateCustomerForm.controls;
  }

  get valueFormUpdateCustomer() {
    return this.updateCustomerForm.value
  }

}
