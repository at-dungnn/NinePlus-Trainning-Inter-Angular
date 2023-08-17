import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CrudBaseService } from 'src/app/core';
import { ApiResponse } from 'src/app/core/http/api-response';
import { Service, ServiceCreateAndEdit } from 'src/app/demo/api/service';

@Injectable({
    providedIn: 'root',
})
export class ServicesService extends CrudBaseService {
    private subject = new Subject<any>();
    constructor(private _httpClient: HttpClient) {
        super('service', _httpClient);

    }
    sendClickEvent() {
        this.subject.next(event);
    }

    getClickEvent(): Observable<any> {
        return this.subject.asObservable();
    }
    getListServices(): Observable<ApiResponse> {
        return this.list();
    }
    deleteServiceById(id: string): Observable<Service> {
        return this.delete(id, 'id');
    }
    filterService(body: any): Observable<any[]> {
        return this.filter(body);
    }
    createService(service: any): Observable<ApiResponse> {
        return this.create(service);
    }
    updateService(service: ServiceCreateAndEdit): Observable<ApiResponse> {
        return this.updateByPut(service);
    }
    getServiceById(id: string): Observable<any> {
        return this.get(id);
    }

}
