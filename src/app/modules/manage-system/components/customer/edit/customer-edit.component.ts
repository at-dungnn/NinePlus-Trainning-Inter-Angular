import { Component, DoCheck, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Customer } from 'src/app/demo/api/customer';
import { CustomerService } from 'src/app/demo/service/customer.service';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
})
export class CustomerEditComponent implements OnInit {

  id: string = "";

  dateFormat: string = "mm/dd/yy";

  customer: Customer = {}

  submitted: boolean = false;

  constructor(private activatedRoute: ActivatedRoute,
    private customerService: CustomerService,
    private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.id = params.get('id') + "";
    });
    this.getCustomerById(this.id)
  }

  navigateToListCustomer() {
    this.router.navigate(['/customer/list'])
  }

  getCustomerById(id: any) {
    this.customerService.getCustomer().then(customers => {
      customers.forEach(customer => {
        if (customer.id === Number(id)) {
          this.customer = customer
        }
      })
    })
  }

}
