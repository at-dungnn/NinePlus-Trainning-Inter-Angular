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
import { InputMaskModule } from 'primeng/inputmask';
@NgModule({
    declarations: [EmployeeEditComponent],
    imports: [
        CommonModule,
        EmployeeEditRoutingModule,
        FileUploadModule,
        InputTextareaModule,
        CalendarModule,
        ToggleButtonModule,
        ImageModule,
        SharedModule,
        InputMaskModule
    ],
})
export class EmployeeEditModule { }
