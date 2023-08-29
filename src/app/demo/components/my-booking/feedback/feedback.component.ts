import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { FeedBack, ImageFeedBack } from 'src/app/demo/api/feedback';
import { BookingDetailResponses } from 'src/app/demo/api/my-booking';
import { MESSAGE_ERROR, MESSAGE_TITLE, TOAST } from 'src/app/shared';
import { FeedbackService } from 'src/app/shared/services/feedback.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { UploadService } from 'src/app/shared/services/upload.service';

interface FileResponse {
    fileUrl: string;
    filePath: string;
}
const MESSAGE_ERROR_FEEDBACK = {
    RATING: 'Vui lòng chọn đánh giá',
};

@Component({
    selector: 'app-feedback',
    templateUrl: './feedback.component.html',
    styleUrls: ['./feedback.component.scss'],
})
export class FeedbackComponent {
    @Input() isShowWriteFeedBack: boolean = false;
    @Input() bookingDetail!: BookingDetailResponses;
    @Output() controlDialog: EventEmitter<any> = new EventEmitter();
    keyToast = TOAST.KEY_BC;
    formFeedback!: FormGroup;
    imageUrl: string[] = [];
    videoUrl: string[] = [];
    fileUploadImage: File[] = [];
    fileUploadVideo: File[] = [];
    fileUploads: File[] = [];
    submitted: boolean = false;
    isLoadingSubmit = false;
    constructor(
        private _router: Router,
        private _fb: FormBuilder,
        private _toastService: ToastService,
        private _uploadService: UploadService,
        private _feedbackService: FeedbackService,
        private _confirmationService: ConfirmationService
    ) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['bookingDetail']) {
            this.bookingDetail = changes['bookingDetail']?.currentValue;
            if (this.bookingDetail) {
                this.formFeedback.patchValue({
                    bookingDetailId: this.bookingDetail.bookingDetailId,
                });
            }
        }
    }

    ngOnInit(): void {
        this.initFormCreateEmployee();
    }

    initFormCreateEmployee() {
        this.formFeedback = this._fb.group({
            rating: ['', [Validators.required]],
            bookingDetailId: ['', [Validators.required]],
            staffContent: [''],
            serviceContent: [''],
            feedbackImageRequests: [[]],
        });
        if (this.bookingDetail) {
            this.formFeedback.patchValue({
                bookingDetailId: this.bookingDetail.bookingDetailId,
            });
        }
    }

    async createFeedback() {
        this.submitted = true;
        this.isLoadingSubmit = true;
        if (this.formFeedback.valid) {
            if (this.fileUploadImage.length > 0 || this.fileUploadVideo.length > 0) {
                this.fileUploads = this.fileUploadImage.concat(this.fileUploadVideo);
                for (let i = 0; i < this.fileUploads.length; i++) {
                    const formData = new FormData();
                    formData.append('file', this.fileUploads[i]);
                    formData.append('filePath', 'feedback');
                    try {
                        const res: any = await this._uploadService.upLoadFile(formData).toPromise();

                        let feedbackImage: ImageFeedBack = {
                            nameFile: '',
                            typeFile: '',
                        };
                        feedbackImage.nameFile = (res.data as FileResponse).filePath;
                        feedbackImage.typeFile = this.fileUploads[i].type;
                        const fd = this.formFeedback.value.feedbackImageRequests as Array<ImageFeedBack>;
                        this.formFeedback.patchValue({
                            feedbackImageRequests: [...fd, feedbackImage],
                        });
                    } catch (error) {}
                }
            }
            this._feedbackService.postFeedbackMyBooking(this.formFeedback.value as FeedBack).subscribe({
                next: (res) => {
                    this._toastService.showSuccess(MESSAGE_TITLE.SAVE_SUCC, this.keyToast);
                    setTimeout(() => {
                        this.hiddenDialog();
                    }, 1000);
                },
                error: (err) => {
                    this.showErrorResponse(err);
                },
            });
        } else {
            if (this.valueForm.rating <= 0) {
                this._toastService.showError(MESSAGE_ERROR_FEEDBACK.RATING, this.keyToast);
            }
        }
        setTimeout(() => {
            this.isLoadingSubmit = false;
        });
    }

    previewImage(event: any): void {
        const files: File[] = event.target.files;
        for (let i = 0; i < files.length; i++) {
            const maxSize = 1024 * 1024; // 1 MB
            if (files[i].size < maxSize && files[i].type) {
                this.fileUploadImage.push(files[i]);
                const reader = new FileReader();
                reader.onload = (e: any) => {
                    const base64Data = e.target.result;
                    this.imageUrl.push(base64Data);
                };
                reader.readAsDataURL(files[i]);
            }
        }
    }

    showConfirmPostFeedback() {
        this._confirmationService.confirm({
            icon: 'pi pi-exclamation-triangle',
            key: 'confirm-feedback',
            accept: () => {
                this.createFeedback();
                this._confirmationService.close();
            },
            reject: () => {
                this._confirmationService.close();
            },
        });
    }

    previewVideo(event: any): void {
        const files = event.target.files;
        for (let i = 0; i < files.length; i++) {
            if (files[i].type) {
                this.fileUploadVideo.push(files[i]);
                const reader = new FileReader();
                reader.onload = () => {
                    const url = reader.result as string;
                    this.videoUrl.push(url);
                };
                reader.readAsDataURL(files[i]);
                reader.onerror = function (error) {};
            }
        }
    }

    showErrorResponse(err: HttpErrorResponse) {
        if (err.error.messages) {
            err.error.messages.forEach((item: string) => {
                this._toastService.showErrorNoKey(item);
            });
        }
    }

    deletePreviewImage(url: string, index: number) {
        this.imageUrl = this.imageUrl.filter((string) => {
            return string !== url;
        });
        this.fileUploadImage = this.fileUploadImage.filter((file, i) => {
            return i !== index;
        });
    }

    deletePreviewVideo(url: string, index: number) {
        this.videoUrl = this.videoUrl.filter((string) => {
            return string !== url;
        });
        this.fileUploadVideo = this.fileUploadVideo.filter((file, i) => {
            return i !== index;
        });
    }

    hiddenDialog() {
        this.controlDialog.emit();
        this.resetValue();
    }
    resetValue() {
        this.formFeedback.patchValue({
            rating: '',
            staffContent: '',
            serviceContent: '',
            feedbackImageRequests: null,
        });
        this.imageUrl = [];
        this.videoUrl = [];
        this.fileUploadImage = [];
        this.fileUploadVideo = [];
        this.fileUploads = [];
        this.submitted = false;
    }

    get valueForm() {
        return this.formFeedback.value;
    }
    get f() {
        return this.formFeedback.controls;
    }
}
