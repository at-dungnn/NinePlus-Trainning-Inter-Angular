import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { Customer } from 'src/app/demo/api/customer';
import { CustomerService } from 'src/app/demo/service/customer.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss'],
  providers: [DialogService, MessageService]
})
export class CustomerDetailComponent {


  dialogBooking: boolean = false;

  id: string = "";

  dateFormat: string = "mm/dd/yy";

  customer: Customer = {}

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private customerService: CustomerService,
    public dialogService: DialogService,
    public messageService: MessageService
  ) {
  }


  hideDialog() {
    // child call parent
    this.dialogBooking = false;
  }

  showDialogBooking() {
    setTimeout(() => {
      this.dialogBooking = true
    }, 100)
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.id = params.get('id') + "";
    });
    this.getCustomerById(this.id)
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


  navigateToListCustomer() {
    this.router.navigate(['/customer/list'])
  }



}
