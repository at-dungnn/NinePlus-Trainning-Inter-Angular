import { Component } from '@angular/core';
import { Customer } from 'src/app/demo/api/customer';

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
})
export class CustomerCreateComponent {

  dateFormat: string = "mm/dd/yy";

  customer: Customer = {}

  onSubmit() {
    console.log(this.customer);
  }
}
