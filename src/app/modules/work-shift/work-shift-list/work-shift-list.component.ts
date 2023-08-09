import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Workshift } from 'src/app/demo/api/work-shift';
import { WorkShiftService } from 'src/app/shared/services/work-shift.service';
import { ROUTER } from 'src/app/shared';
import { ToastService } from 'src/app/shared/services/toast.service';
import { MESSAGE_TITLE } from 'src/app/shared';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FilterHelper } from 'src/app/core/helpers/filter.helper';

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
  formFilter!: FormGroup;
  totalRecords: number = 0;
  firstPaging = 0;

  constructor(private _workShiftService: WorkShiftService,
    private _router: Router,
    private _toastService: ToastService,
    private _notificationService: NotificationService,
    private _detect: ChangeDetectorRef,
    private _fb: FormBuilder) { }

  ngOnInit() {
    this.initForm();
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

  initForm(): void {
    this.formFilter = this._fb.group({
      keyword: [''],
      pageNumber: [1],
      pageSize: [5],
      isExport: false,
    });
  }

  filter(event: any): void {
    if (event && event.first) {
      this.firstPaging = event.first;
    }
    event.sortField && FilterHelper.sortOrderByNoneMulti(this.formFilter, event.sortField, event.sortOrder);
    event.rows && FilterHelper.setPagingSize(this.formFilter, event.rows);
    (event.first || event.first === 0) &&
      event.rows &&
      FilterHelper.setPageNumber(this.formFilter, FilterHelper.getPageNumber(event.first, event.rows));
    this.filterWorkshift();
  }
  filterWorkshift() {
    this.isSkeleton = true;
    let param = FilterHelper.removeNullValue(this.formFilter.value);
    this._workShiftService.filterWorkshift(param).subscribe({
      next: (res: any) => {
        this.workshifts = res.data as Workshift[];
        this.totalRecords = res.totalCount as number;
        if (this.workshifts.length === 0) {
          this._toastService.showWarningNoKey(MESSAGE_TITLE.LIST_EMPTY);
        }
        this.loadSkeletonTable();
        this._detect.detectChanges();
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

  clearFilter(): void {
    this.formFilter.reset();
    this.initForm();
    this.filterWorkshift();
  }

}