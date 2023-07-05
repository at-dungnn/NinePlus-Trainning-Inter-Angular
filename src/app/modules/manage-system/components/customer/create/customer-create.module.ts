import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerCreateRoutingModule } from './customer-create-routing.module';
import { CustomerCreateComponent } from './customer-create.component';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SharedModule } from 'src/app/shared';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [CustomerCreateComponent],
  imports: [
    CommonModule,
    CustomerCreateRoutingModule,
    CalendarModule,
    InputTextareaModule,
    SharedModule,
    InputNumberModule,
    FormsModule
  ]
})
export class CustomerCreateModule { }
