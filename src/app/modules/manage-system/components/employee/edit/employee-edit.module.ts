import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeEditRoutingModule } from './employee-edit-routing.module';
import { EmployeeEditComponent } from './employee-edit.component';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { SharedModule } from 'src/app/shared';
import { ImageModule } from 'primeng/image';
@NgModule({
    declarations: [EmployeeEditComponent],
    imports: [
        CommonModule,
        EmployeeEditRoutingModule,
        FileUploadModule,
        InputTextareaModule,
        CalendarModule,
        ToggleButtonModule,
        SharedModule,
        ImageModule,
    ],
})
export class EmployeeEditModule {}
