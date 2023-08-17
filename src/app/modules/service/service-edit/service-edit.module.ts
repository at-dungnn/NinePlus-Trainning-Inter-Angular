import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceEditRoutingModule } from './service-edit-routing.module';
import { ServiceEditComponent } from './service-edit.component';
import { SharedModule } from 'src/app/shared';
import { InputMaskModule } from 'primeng/inputmask';


@NgModule({
  declarations: [ServiceEditComponent],
  imports: [
    CommonModule,
    ServiceEditRoutingModule,
    SharedModule,
    InputMaskModule
  ]
})
export class ServiceEditModule { }
