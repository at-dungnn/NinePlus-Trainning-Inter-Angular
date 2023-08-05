import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Workshift } from 'src/app/demo/api/work-shift';
import { WorkShiftService } from 'src/app/shared/services/work-shift.service';
import { ROUTER } from 'src/app/shared';
import { ToastService } from 'src/app/shared/services/toast.service';
import { MESSAGE_TITLE } from 'src/app/shared';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-work-shift-list',
  templateUrl: './work-shift-list.component.html',
  styleUrls: ['./work-shift-list.component.scss'],
  providers: [MessageService, ToastService],
})
export class WorkShiftListComponent {
  workshifts: Workshift[] = [];
  workshift: Workshift = {};
  isSkeleton: boolean = true;
  selectedObjects: number[] = [];
  deleteProductsDialog: boolean = false;


  constructor(private _workShiftService: WorkShiftService,
    private _router: Router,
    private _toastService: ToastService,
    private _notificationService: NotificationService) { }

  ngOnInit() {
    this.getListWorkShift();
    this.loadSkeletonTable();
  }

  getListWorkShift() {
    this._workShiftService.getListWorkShift().subscribe({
      next: (res) => {
        this.workshifts = res.data as Workshift[];
        if (this.workshifts.length === 0) {
          this._toastService.showWarningNoKey(MESSAGE_TITLE.LIST_EMPTY);
        }
        this.toastFormAnotherScreen();
      },
      error: (error) => {
        error.error.messages.forEach((item: string) => {
          this._toastService.showErrorNoKey(item);
        });
      },
    });
  }

  navigateToDetalWorkshift(idWorkshift: number, nameWorkshitf: string) {
    this._router.navigate([ROUTER.DETAIL_WORKSHIFT + idWorkshift + '/' + nameWorkshitf]);
  }

  navigateToCreateWorkshift() {
    this._router.navigate([ROUTER.CREATE_WORKSHIFT]);
  }

  navigateToUpdateWorkshift(id: number) {
    this._router.navigate([ROUTER.UPDATE_WORKSHIFT + id]);
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  loadSkeletonTable() {
    setTimeout(() => {
      this.isSkeleton = false;
    }, 1000);
  }

  toastFormAnotherScreen() {
    const message = this._notificationService.getMessage();
    if (message) {
      this._toastService.showSuccessNoKey(message.toString());
      this._notificationService.clearMessage();
    }
  }

  confirmDelete(workshift: Workshift) {
    if (workshift.id != -1 && workshift.id != undefined) {
      this.workshift = { ...workshift };
      this.deleteProductsDialog = true;
    }
  }

  deleteConfirmed() {
    if (this.workshift.id) {
      this._workShiftService.deleteWorkShiftById(this.workshift.id.toString()).subscribe({
        next: (res) => {
          this._toastService.showSuccessNoKey(MESSAGE_TITLE.DELETE_SUCC);
          this.getListWorkShift();
          this.deleteProductsDialog = false;
          this.workshift = {};
        },
        error: (error) => {
          error.error.messages.forEach((item: string) => {
            this._toastService.showErrorNoKey(item);
          });
          this.deleteProductsDialog = false;
        },
      });
    }
  }

  isSelected(id: number): boolean {
    return this.selectedObjects.indexOf(id) !== -1;
  }

}
