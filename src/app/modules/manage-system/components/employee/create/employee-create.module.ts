import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeCreateRoutingModule } from './employee-create-routing.module';
import { EmployeeCreateComponent } from './employee-create.component';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { SharedModule } from 'src/app/shared';
@NgModule({
    declarations: [EmployeeCreateComponent],
    imports: [CommonModule, EmployeeCreateRoutingModule, FileUploadModule, InputTextareaModule, CalendarModule, SharedModule],
})
export class EmployeeCreateModule {}
