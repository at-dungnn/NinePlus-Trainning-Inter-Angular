import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { CrudBaseService } from 'src/app/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadService extends CrudBaseService {
  private _employeeSubject: BehaviorSubject<any>;
  private subject = new Subject<any>();
  dataEmployee$: Observable<any>;
  constructor(private _httpClient: HttpClient) {
    super('upload', _httpClient);
    this._employeeSubject = new BehaviorSubject<any>({});
    this.dataEmployee$ = this._employeeSubject.asObservable();
  }
  sendClickEvent() {
    this.subject.next(event);
  }
  getClickEvent(): Observable<any> {
    return this.subject.asObservable();
  }

  upLoadFile(body: any) {
    return this.httpClient.post(`${this.basePath}`, body);
  }

  deleteImage(body: any) {
    // const httpOptions = {
    //   headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data' }),
    //   body: { imageId: body }, // Dữ liệu cần gửi đi để server biết mà xoá
    // };
    return this.httpClient.delete(`${this.basePath}`, { body: body });
  }
}
