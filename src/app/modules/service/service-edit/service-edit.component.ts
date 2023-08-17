import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { SERVICE_TIME } from 'src/app/shared/constants/service-time';
import { Router } from '@angular/router';
import { ServicesService } from 'src/app/shared/services/service.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { UploadService } from 'src/app/shared/services/upload.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { FilterHelper } from 'src/app/core/helpers/filter.helper';
import { MESSAGE_TITLE, ROUTER } from 'src/app/shared';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-service-edit',
  templateUrl: './service-edit.component.html',
  styleUrls: ['./service-edit.component.scss']
})
export class ServiceEditComponent {
  keyToast = 'bc';
  form!: FormGroup;
  fileUrl: string = '';
  serviceTimes = SERVICE_TIME;
  fileUpload: any;
  checkValidImg: boolean = false;
  checkValidInput: boolean = false;

  constructor(private _fb: FormBuilder,
    private _router: Router,
    private _serviceService: ServicesService,
    private _toastService: ToastService,
    private _uploadService: UploadService,
    private _notificationService: NotificationService,
    private _activatedRoute: ActivatedRoute,) {

  }

  ngOnInit() {
  }

  updateService() {
  }

  initForm() {
    this.form = this._fb.group({
      id: [''],
      name: ['', Validators.compose([Validators.required])],
      serviceTime: ['', Validators.compose([Validators.required])],
      price: ['', Validators.compose([Validators.required])],
      description: [''],
      servicesImageRequests: this._fb.array([
        this._fb.group({
          nameFile: [''],
          typeFile: ['']
        })
      ]),
    });
  }

  getEmployeeById() {
    this._activatedRoute.paramMap.subscribe((next) => {
      const id = next.get('id');
      if (id) {
        this._serviceService.getServiceById(id).subscribe({
          next: (res) => {
            this.form.patchValue(res);
            console.log(res);
            this.fileUrl = res.imageLink;
            this.form.patchValue({
              image: res.image,
            });
          },
          error: (error) => {
            error.error.Messages.forEach((item: string) => {
              this._toastService.showError(item, this.keyToast);
            });
          },
        });
      }
    });
  }

  uploadFile(event: any): void {
    this.fileUpload = event.target.files[0];
    this.getBase64(event.target.files[0]);
    if (this.fileUpload) {
      this.checkValidImg = false
    }
  }
  getBase64(file: any) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.fileUrl = reader.result as string;
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  navigateBackServiceList() {
    this._router.navigate([ROUTER.LIST_SERVICE]);
  }
}
