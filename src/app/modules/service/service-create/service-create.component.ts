import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { SERVICE_TIME } from 'src/app/shared/constants/service-time';
import { Router } from '@angular/router';
import { ServicesService } from 'src/app/shared/services/service.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { UploadService } from 'src/app/shared/services/upload.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { FilterHelper } from 'src/app/core/helpers/filter.helper';
import { MESSAGE_TITLE, ROUTER } from 'src/app/shared';

@Component({
  selector: 'app-service-create',
  templateUrl: './service-create.component.html',
  styleUrls: ['./service-create.component.scss'],
  providers: [MessageService, ToastService]
})
export class ServiceCreateComponent {
  keyToast = 'bc';
  form!: FormGroup;
  fileUrl: string = '';
  nameFile: string = '';
  serviceTimes = SERVICE_TIME;
  fileUpload: any;
  checkValidImg: boolean = false;
  checkValidInput: boolean = false;
  files!: FileList;
  i: number = 0;
  constructor(private _fb: FormBuilder,
    private _router: Router,
    private _serviceService: ServicesService,
    private _toastService: ToastService,
    private _uploadService: UploadService,
    private _notificationService: NotificationService,) {

  }
  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = this._fb.group({
      id: [0],
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

  createService() {
    if (this.form.valid) {
      let param = FilterHelper.removeNullValue(this.form.value);
      const formData = new FormData();
      formData.append('file', this.fileUpload);
      formData.append('filePath', this.nameFile);
      this._uploadService.upLoadFile(formData).subscribe({
        next: (res: any) => {
          param.servicesImageRequests[0].nameFile = this.nameFile
          param.servicesImageRequests[0].typeFile = res.data.filePath
          this._serviceService.createService(param).subscribe({
            next: (res) => {
              this._notificationService.addMessage(MESSAGE_TITLE.ADD_SUCC);
              this.navigateBackServiceList();
            },
            error: (error) => {
              if (error.error.messages) {
                error.error.messages.forEach((item: string) => {
                  this._toastService.showError(item, this.keyToast);
                });
              }
            },
          });
        },
      });
    } else {
      this.checkValidImg = true;
      this.checkValidInput = true;
    }
  }

  uploadFile(event: any): void {
    this.files = event.target.files;
    this.fileUpload = event.target.files[0];
    this.nameFile = event.target.files[0].name;
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
      // this._detect.detectChanges();
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  navigateBackServiceList() {
    this._router.navigate([ROUTER.LIST_SERVICE]);
  }
}
