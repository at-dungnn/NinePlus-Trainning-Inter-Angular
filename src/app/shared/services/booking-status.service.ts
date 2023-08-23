import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { CrudBaseService } from 'src/app/core';
import { ApiResponse } from 'src/app/core/http/api-response';
import { BookingStatus } from '../models/bookingStatus';

@Injectable({
    providedIn: 'root',
})
export class BookingStatusService extends CrudBaseService {
    private _statusSubject: BehaviorSubject<any>;
    private subject = new Subject<any>();
    dataStatus$: Observable<any>;

    constructor(private _httpClient: HttpClient) {
        super('bookingstatus', _httpClient);
        this._statusSubject = new BehaviorSubject<any>({});
        this.dataStatus$ = this._statusSubject.asObservable();
    }

    sendClickEvent() {
        this.subject.next(event);
    }

    getClickEvent(): Observable<any> {
        return this.subject.asObservable();
    }

    getListStatusBooking(): Observable<ApiResponse> {
        return this.httpClient.get<any>(`${this.basePath}`);
    }

    addStatus(status: BookingStatus): Observable<ApiResponse> {
        return this.create(status);
    }

    getStatusById(id: string): Observable<ApiResponse> {
        return this.get(id);
    }

    updateStatus(status: BookingStatus): Observable<ApiResponse> {
        return this._httpClient.put(`${this.basePath}`, status);
    }

    deleteStatus(id: string): Observable<ApiResponse> {
        return this.delete(id, 'id');
    }
}
