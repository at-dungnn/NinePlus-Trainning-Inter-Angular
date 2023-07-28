import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangePasswordRoutingModule } from './changepassword-routing.module';
import { ChangePasswordComponent } from './changepassword.component';

@NgModule({
    declarations: [ChangePasswordComponent],
    imports: [CommonModule, ChangePasswordRoutingModule],
})
export class ChangePasswordModule {}
