import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeCreateRoutingModule } from './employee-create-routing.module';
import { EmployeeCreateComponent } from './employee-create.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { FileUploadModule } from 'primeng/fileupload';
import { SharedModule } from 'src/app/shared';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [EmployeeCreateComponent],
    imports: [CommonModule, EmployeeCreateRoutingModule, InputTextareaModule, CalendarModule, FileUploadModule, SharedModule, FormsModule],
})
export class EmployeeCreateModule {}
