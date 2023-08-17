import { Component, ChangeDetectorRef } from '@angular/core';
import { ServicesService } from 'src/app/shared/services/service.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/shared/services/toast.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { Service } from 'src/app/demo/api/service';
import { MESSAGE_TITLE, ROUTER } from 'src/app/shared';
import { FilterHelper } from 'src/app/core/helpers/filter.helper';
import { SERVICE_TIME } from 'src/app/shared/constants/service-time';
import { REVIEW } from 'src/app/shared/constants/service-time';
@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.scss'],
  providers: [MessageService, ConfirmationService, ToastService]
})
export class ServiceListComponent {
  isSkeleton: boolean = true;
  deleteProductsDialog: boolean = false;
  service = {} as Service;
  services: Service[] = [];
  totalRecords: number = 0;
  firstPaging = 0;
  formFilter!: FormGroup;
  serviceTimes = SERVICE_TIME;
  reviews = REVIEW;
  constructor(private _serviceService: ServicesService,
    private _messageService: MessageService,
    private _router: Router,
    private _confirmationService: ConfirmationService,
    private _toastService: ToastService,
    private _fb: FormBuilder,
    private _notificationService: NotificationService,
    private _detect: ChangeDetectorRef,) {

  }

  ngOnInit() {
    this.initForm();
  }
  initForm(): void {
    this.formFilter = this._fb.group({
      keyword: [''],
      time: [''],
      review: [''],
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
    this.filterService();
  }
  filterService() {
    this.isSkeleton = true;
    let param = FilterHelper.removeNullValue(this.formFilter.value);
    this._serviceService.filterService(param).subscribe({
      next: (res: any) => {
        this.services = res.data as Service[];
        console.log(this.services)
        this.totalRecords = res.totalCount as number;
        if (this.services.length === 0) {
          this._toastService.showWarningNoKey(MESSAGE_TITLE.LIST_EMPTY);
        }
        this.toastFormAnotherScreen();
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

  toastFormAnotherScreen() {
    const message = this._notificationService.getMessage();
    if (message) {
      this._toastService.showSuccessNoKey(message.toString());
      this._notificationService.clearMessage();
    }
  }

  deleteConfirmed() {
    if (this.service.id) {
      this._serviceService.deleteServiceById(this.service.id.toString()).subscribe({
        next: (next) => {
          this._toastService.showSuccessNoKey(MESSAGE_TITLE.DELETE_SUCC);
          this.filterService();
          this.deleteProductsDialog = false;
          this.service = {} as Service;
        },
        error: (error) => {
          this._toastService.showErrorNoKey(MESSAGE_TITLE.DELETE_ERR);
        },
      });
    }
  }

  confirmDelete(service: Service) {
    if (service.id != -1 && service.id != undefined) {
      this.service = { ...service };
      this.deleteProductsDialog = true;
    }
  }
  navigateToCreateService() {
    this._router.navigate([ROUTER.CREATE_SERVICE]);
  }

  navigateToEditService(id: number) {
    this._router.navigate([ROUTER.EDIT_SERVICE + id]);
  }

  loadSkeletonTable() {
    setTimeout(() => {
      this.isSkeleton = false;
    }, 1000);
  }

  clearFilter(): void {
    this.formFilter.reset();
    this.initForm();
    this.filterService();
  }
}
