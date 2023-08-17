import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceCreateRoutingModule } from './service-create-routing.module';
import { ServiceCreateComponent } from './service-create.component';
import { SharedModule } from 'src/app/shared';
import { InputMaskModule } from 'primeng/inputmask';

@NgModule({
  declarations: [ServiceCreateComponent],
  imports: [
    CommonModule,
    ServiceCreateRoutingModule,
    SharedModule,
    InputMaskModule
  ]
})
export class ServiceCreateModule { }
