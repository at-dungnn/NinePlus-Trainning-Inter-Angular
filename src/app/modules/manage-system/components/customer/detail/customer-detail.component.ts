import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { Customer } from 'src/app/demo/api/customer';
import { CustomerService } from 'src/app/demo/service/customer.service';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss'],
  providers: [DialogService]
})
export class CustomerDetailComponent {

  dialogBooking: boolean = false;

  idCustomer: string = "";

  customer: Customer = {}

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private customerService: CustomerService,
    public dialogService: DialogService,
  ) {
  }

  ngOnInit() {
    this.getIdRequestParam()
    this.FetCustomerById(this.idCustomer)
  }

  getIdRequestParam() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.idCustomer = params.get('id') + "";
    });
  }

  FetCustomerById(id: string) {
    this.customerService.getCustomerById(id).subscribe(customer => {
      this.customer = customer
    })
  }

  hideDialogBooking() {
    this.dialogBooking = false;
  }

  showDialogBooking() {
    this.dialogBooking = true
  }

  navigateToListCustomer() {
    this.router.navigate(['/customer/list'])
  }

}
