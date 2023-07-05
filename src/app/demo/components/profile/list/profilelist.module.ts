import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ProgressBarModule } from 'primeng/progressbar';
import { ProfileListComponent } from './profilelist.component';
import { ProfileListRoutingModule } from './profilelist-routing.module';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
import { DynamicDialogModule } from 'primeng/dynamicdialog';


@NgModule({
	imports: [
		CommonModule,
		ProfileListRoutingModule,
		RippleModule,
		ButtonModule,
		InputTextModule,
		TableModule,
		ProgressBarModule,
		ConfirmDialogModule,
		ToastModule,
		ConfirmDialogModule,
		ConfirmPopupModule,
		FormsModule,
		DialogModule,
		CalendarModule,
		DynamicDialogModule
	],
	declarations: [ProfileListComponent]
})
export class ProfileListModule { }