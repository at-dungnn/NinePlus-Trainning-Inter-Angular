import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeCreateRoutingModule } from './employee-create-routing.module';
import { EmployeeCreateComponent } from './employee-create.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { FileUploadModule } from 'primeng/fileupload';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared';
import { InputMaskModule } from 'primeng/inputmask';

@NgModule({
    declarations: [EmployeeCreateComponent],
    imports: [CommonModule,
        EmployeeCreateRoutingModule,
        InputTextareaModule,
        CalendarModule,
        FileUploadModule,
        SharedModule,
        FormsModule,
        InputMaskModule],
})
export class EmployeeCreateModule { }
