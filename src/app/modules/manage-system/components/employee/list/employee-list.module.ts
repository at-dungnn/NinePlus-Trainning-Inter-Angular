import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeListRoutingModule } from './employee-list-routing.module';
import { EmployeeListComponent } from './employee-list.component';
import { FileUploadModule } from 'primeng/fileupload';
import { SpeedDialModule } from 'primeng/speeddial';
import { MenuModule } from 'primeng/menu';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ContextMenuModule } from 'primeng/contextmenu';
import { FormsModule } from '@angular/forms';
import { SkeletonModule } from 'primeng/skeleton';
import { SharedModule } from 'src/app/shared';
import { MessagesModule } from 'primeng/messages';
@NgModule({
    declarations: [EmployeeListComponent],
    imports: [
        CommonModule,
        EmployeeListRoutingModule,
        FileUploadModule,
        SpeedDialModule,
        MenuModule,
        ContextMenuModule,
        SplitButtonModule,
        SkeletonModule,
        FormsModule,
        MessagesModule,
        SharedModule,
    ],
})
export class EmployeeListModule {}
